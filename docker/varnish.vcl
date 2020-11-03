vcl 4.1;

backend josecarlos_me {
    .host = "josecarlos-me";
    .port = "80";
}

sub vcl_recv {
    set req.backend_hint = josecarlos_me;


    if (req.method != "GET" &&
      req.method != "HEAD" &&
      req.method != "PUT" &&
      req.method != "POST" &&
      req.method != "TRACE" &&
      req.method != "OPTIONS" &&
      req.method != "DELETE") {
        return (pipe);
    }

    if (req.method != "GET" && req.method != "HEAD") {
      return (pass);
    }


    return (hash);
}

sub vcl_backend_response {
  if (beresp.status == 200) {
    unset beresp.http.Cache-Control;
    if (bereq.url ~ "\.(gif|jpg|jpeg|swf|ttf|css|js|flv|mp3|mp4|pdf|ico|png)(\?.*|)$") {
        set beresp.http.Cache-Control = "public; max-age=31536000";
	    set beresp.ttl = 365d;
    } else {
        set beresp.http.Cache-Control = "public; max-age=86400";
        set beresp.ttl = 86400s;
    }

    set beresp.grace = 365d;
  }
}

sub vcl_deliver {
  if (obj.hits > 0) {
    set resp.http.X-Cache = "HIT";
  } else {
    set resp.http.X-Cache = "MISS";
  }
}
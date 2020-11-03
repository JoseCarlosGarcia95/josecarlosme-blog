+++
author = "José Carlos García"
date = 2020-04-12T20:53:49Z
description = ""
draft = false
image = "cover.jpeg"
slug = "ia-1-introduccion"
categories = ["ia"]
tags = ["ia", "python", "tensorflow"]
title = "Inteligencia Artificial: #1 Introducción, rectas de regresión"
latex = true
+++


Cuando nos hablan de inteligencia artificial, nos asustamos y pensamos en primera instancia que estos conocimientos están lejos de la mano de los mortales.

En estas entradas voy a tratar de introducir de manera intuitiva los conceptos básicos del *machine learning* y presentar algunas implementaciones y aplicaciones, con el objetivo de aprender yo mismo, y que otra gente aprenda.

En este artículo tratamos uno de los modelos más básicos, la regresión lineal.

![](https://images.unsplash.com/photo-1546188994-07c34f6e5e1b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)
<small>Photo by <a href="https://unsplash.com/@drew_beamer?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit">Drew Beamer</a> / <a href="https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit">Unsplash</a></small>

# Predicciones básicas
Supongamos que nos vamos a mudar a Boston, y **estamos observando la relación entre el número de habitaciones y el precio de las viviendas.**

## Recopilación de datos
Anotamos en una tabla los valores que hemos observado:

| Precio vivienda | Nº de habitaciones |
| --- | --- |
|24.0|6.575|
|21.6|6.421|
|34.7|7.185|
|33.4|6.998|
|36.2|7.147|
|28.7|6.43|
|22.9|6.012|
|27.1|6.172|
|16.5|5.631|
|18.9|6.004|

Un primer acercamiento que podemos hacer es **dibujar una nube de puntos** donde el eje de las X corresponda al número medio de habitaciones, y el eje de las Y corresponda al precio medio de la vivienda.

{{< figure src="/blog/content/images/2020/09/dataset-scatter-3.png" caption="" >}}

Una primera opción para resumir estos datos, es **dibujar una recta que pase cerca de todos los datos**, pero, ¿Cómo podemos hacerlo? ¿Podemos tantear la solución?

<figure>
  <div>
    <div>
      <div><img src="/blog/content/images/2020/09/dataset-scatter-1-1.png" width="640" height="480"/></div>
      <div><img src="/blog/content/images/2020/09/dataset-scatter-2-1.png" width="640" height="480"/></div>
      <div><img src="/blog/content/images/2020/09/dataset-scatter-3-1.png" width="640" height="480"/></div>
    </div>
  </div>
</figure>

Parece que **tratar de solucionar este problema por tanteo, no es factible**, tratemos de buscar una solución aplicando las matemáticas.

## Recta de regresión lineal
Queremos calcular una recta que minimice los errores entre todos los puntos
![dataset-scatter-error-1](/blog/content/images/2020/09/dataset-scatter-error-1.png)

Si calculamos la media de estos errores y los elevamos al cuadrado, obtenemos lo que se denomina **error cuadrático medio**, y la recta que cumple esta propiedad se denomina **recta de regresión lineal**.

### Fórmulas para el cálculo de hiperplanos de regresión

Si $X$ es la matriz de variables con una columna de $1$ en la primera columna, e $Y$ son los datos que tenemos y queremos predecir. Si observamos el caso de las viviendas en Boston, la matrix $X$ tendría dos columnas, una sólo con 1, y otra con la media de número de habitaciones, por otro lado, la $Y$ serían los precios de las viviendas.

Entonces, el hiperplano $Y_e=\beta X$ (O recta en $\mathbb{R}^2$) tiene las siguientes componentes:
$$ \beta = (X^T X)^{-1} X^T Y $$

Dado que la primera columna de $X$ está compuesta por 1, el hiperplano vendrá definido por:
$$
    Y_e = \beta_1 X + \beta_0
$$
Donde $\beta_i$ son las componentes del vector $\beta$

### Prediciendo valores
Si volvemos a nuestro caso especifico, vamos a calcular los valores $\beta$ y $\alpha$.

Nuestra matrices $X$ e $Y$, vienen definidas de la siguiente forma:

$$
    X=\left(\begin{matrix}
1 & 6.575 \\\
1 & 6.421 \\\
1 & 7.185 \\\
1 & 6.998 \\\
1 & 7.147 \\\
1 & 6.43 \\\
1 & 6.012 \\\
1 & 6.172 \\\
1 & 5.631 \\\
1 & 6.004
    \end{matrix}\right), Y=\left(\begin{matrix}
24.0 \\\
21.6 \\\
34.7 \\\
33.4 \\\
36.2 \\\
28.7 \\\
22.9 \\\
27.1 \\\
16.5 \\\
18.9
 \end{matrix}\right)
$$

Por tanto,
$$\beta=(-49.98256497,  11.82850406)$$
De donde,
$$
y_e=x b_1 + b_0
$$

Podemos pintar la recta con los gráficos para ver como se ajusta la recta:
![descarga](/blog/content/images/2020/04/descarga.png)

Supongamos ahora, que queremos calcular el precio estimado de una vivienda de 8 habitaciones, ahora simplemente deberíamos sustiuir en nuestra recta otros valores, y tendríamos:
$$
    y_e = 8 \beta_1 + \beta_0 = 44
$$

Por lo cual, predecimos que valor de una vivienda de 8 habitaciones, tendrá un precio aproximadamente de 44k$

![Colorful building corner](https://images.unsplash.com/photo-1451153378752-16ef2b36ad05?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)
<small>Photo by <a href="https://unsplash.com/@hernanlucio?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit">Hernan Lucio</a> / <a href="https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit">Unsplash</a></small>

## Cálculo de recta de regresión lineal Python
Para este ejemplo utilizaremos la librería de cálculo científico **numpy**, se puede encontrar el ejemplo aquí:

- [Ejemplo básico con Numpy](https://colab.research.google.com/drive/1tNfC--BjaaOIPSGJbSMSKJcYG3ySS_hV)
- [Usando funciones ya existentes para calcular la recta de regresión](https://scikit-learn.org/stable/auto_examples/linear_model/plot_ols.html)

## Limitaciones
En el ejemplo específico de los precios de las viviendas en Boston según el número de habitaciones, se puede observar que los datos están más o menos cercanos a la recta de regresión que hemos calculado, y que la nube de puntos se "asemeja" a una recta. Sin embargo, esto no es siempre así. Podría ocurrir que nuestros datos estén sumamente dispersos, y que nos fuese imposible encontrar una recta de regresión donde el error mínimo sea demasiado grande.

Es por eso, que se verán otros modelos más complejos que tratan de solucionar esto.

# Aplicaciones
Como hemos observado, estos modelos son muy básicos y presentan limitaciones, sin embargo son bastante potentes en ciertas situaciones para predecir comportamientos.

Por ejemplo, podemos usar este modelo para predecir métricas en bases de datos temporales como [Prometheus](https://prometheus.io/)

## Prediciendo el futuro con Prometheus
Prometheus incluye dos funciones interesante en este sentido [**predict_linear**](https://prometheus.io/docs/prometheus/latest/querying/functions/#predict_linear) que predice el valor de una serie temporal en el futuro usando regresión lineal.

Esta función nos puede servir para tantear el valor que tendrá una métrica en el futuro. Por ejemplo, si tenemos una métrica que cuenta la cantidad de usuarios conectados durante una campaña, podremos saber cuantos usuarios habrá dentro de un periodo de tiempo.

Por otro lado, tenemos la función [**deriv**](https://prometheus.io/docs/prometheus/latest/querying/functions/#deriv), que nos devuelve la pendiente de la recta de regresión lineal.

Esta pendiente nos permite calcular la velocidad con la que se está moviendo nuestra serie temporal y hacia que dirección. Por ejemplo, si tenemos una métrica que cubre el porcentaje de disco duro libre, y hacemos su derivada en los últimos 30 minutos, y nos da un valor negativo, podremos saber que se están escribiendo ficheros en el disco, además, dado que la pendiente de la recta modela la velocidad de crecimiento (o decrecimiento) de nuestros datos, podremos sacar conclusiones de cuando pasará algo.
![Speedcurve Performance Analytics](https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)
<small>Photo by <a href="https://unsplash.com/@lukechesser?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit">Luke Chesser</a> / <a href="https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit">Unsplash</a></small>

# Fuente / Enlaces de interés

[https://en.wikipedia.org/wiki/Linear_regression](https://en.wikipedia.org/wiki/Linear_regression)

[https://docs.scipy.org/doc/numpy/reference/routines.linalg.html](https://docs.scipy.org/doc/numpy/reference/routines.linalg.html)

[https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html)

[https://docs.scipy.org/doc/numpy/index.html](https://docs.scipy.org/doc/numpy/index.html)

[https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_boston.html](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_boston.html)

<figure>
	     <a href="https://prometheus.io/docs/prometheus/latest/querying/functions/">
	       <div>
	         <div>Query functions | Prometheus</div>
	         <div>An open-source monitoring system with a dimensional data model, flexible query language, efficient time series database and modern alerting approach.</div>
	         <div>
	           <img src="https://prometheus.io/assets/favicons/android-chrome-192x192.png">
	           <span>Prometheus</span>
	           <span>Prometheus</span>
	         </div>
	       </div>
	       <div><img src="https://prometheus.io/assets/prometheus_logo_grey.svg"></div>
	     </a>
</figure>

<iframe width="480" height="270" src="https://www.youtube.com/embed/k964_uNn3l0?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="480" height="270" src="https://www.youtube.com/embed/w2RJ1D6kz-o?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


{{< latex >}}
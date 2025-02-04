---
title: "Lab 9: Interactions between continuous variables"
author: "Fabio Setti"
institute: "PSYC 7804 - Regression with Lab"
bibliography: Additional files/R packages.bib
csl: Additional files/apa.csl
title-slide-attributes:
  data-transition: "zoom"
  data-visibility: "uncounted"
format:
   revealjs:
      footer: "Lab 9: Interactions between continuous variables"
      width: 1280
      height: 720
      chalkboard: true
      slide-number: c/t 
      theme: Fabio_theme/Fabio_theme.scss
      navigation-mode: linear
      controls: false
      auto-stretch: false
      header-includes:
        - <script src="Fabio_theme/Fabio_theme.js"></script>

editor: source
---



## Today's Packages and Data 🤗

:::: {.columns}
::: {.column width="50%"}



::: {.cell .code-150}

```{.r .cell-code  code-fold="true" code-summary="Install Packages Code" code-line-numbers="false"}
# install.packages("tidyverse")
# devtools::install_github("quinix45/FabioFun")
install.packages("ggeffects")
install.packages("interactions")
```
:::

::: {.cell .code-150}

```{.r .cell-code  code-line-numbers="false"}
library(tidyverse)
library(ggeffects)
library(interactions)
library(FabioFun)
theme_set(theme_classic(base_size = 14, 
                        base_family = 'serif'))
```
:::




</br>

<div style="font-size: 26px">

::: {.panel-tabset}
### `ggeffects`




### `interactions`

:::

</div>



:::
::: {.column width="50%"}

<center style="padding-bottom: 41px;"> [Data]{.data-title} </center>



::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
dat <- rio::import("https://github.com/quinix45/PSYC-7804-Regression-Lab-Slides/raw/refs/heads/main/Slides%20Files/Data/Attend.dta")

# select only the variables we are interested in
attend <- dat[,c("final", "attend", "priGPA")]

str(attend, give.attr = FALSE)
```

::: {.cell-output .cell-output-stdout}

```
'data.frame':	680 obs. of  3 variables:
 $ final : num  28 26 30 27 34 25 10 34 26 26 ...
 $ attend: num  27 22 30 31 32 29 30 26 24 29 ...
 $ priGPA: num  2.64 3.52 2.46 2.61 3.32 ...
```


:::
:::



:::
::::


## Why Interactions?

The idea of interaction is that the effect two predictors $X_1$ and $X_2$ have on an outcome $Y$ is fundamentally tied together. 

- More specifically, the effect that $X_1$ has on $Y$ depends on the value of $X_2$, and the effect that $X_2$ has on $Y$ depends on the value of $X_1$.

A very clear example of an interaction effect is how an individual's gender and race jointly affect number of experienced daily microagressions. Looking at gender and race separately would miss much of the picture (intersectionality!)

If we believe that two variables should interact in how they influence $Y$, we can express that with the regression model:

$$
\hat{Y} = b_0 + b_1X_1 + b_2X_2 + b_3(X_1 \times X_2) 
$$





## By the way, Interaction or Moderation? 

<div style="text-align:center; font-size:35px; padding-bottom:14px;">  Interaction and moderation are the same exact thing.</div>

I prefer the term *interaction* to avoid confusion with the term *mediation*, which has absolutely nothing to do with anything discussed in this Lab. That being said ...


:::: {.columns}
::: {.column width="45%"}


When hypothesizing interaction effects, it is useful to make a distinction between a **focal predictor** and a **moderator**. 


<div style="font-size: 24px"> Interactions are usually represented with the diagrams on the right. the variable pointing directly to $Y$ is considered the focal predictor, while the variable pointing to the line is considered the moderator. </div>

<div style="font-size: 22px"> The two representation on the right are equivalent. However, depending on your hypotheses it may make more practical sense to conceptualize one variables as the focal predictor and the other as the moderator. </div>

:::
::: {.column width="55%"}


<center> <img src="Images/moderation.png" style="width:60%;"> </center>

:::
::::





## References












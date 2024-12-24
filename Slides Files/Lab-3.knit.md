---
title: "Lab 3: Reporting Results"
author: "Fabio Setti"
institute: "PSYC 7804 - Regression with Lab"
bibliography: Additional files/R packages.bib
csl: Additional files/apa.csl
title-slide-attributes:
  data-transition: "zoom"
format:
   revealjs:
      footer: "Lab 3: Reporting Results"
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




## Today's Packages 🤗

:::: {.columns}
::: {.column width="50%"}



::: {.cell .code-150}

```{.r .cell-code  code-fold="true" code-summary="Install Packages Code" code-line-numbers="false"}
install.packages("flextable")
install.packages("rio")
install.packages("tidyverse")
```
:::

::: {.cell .code-150}

```{.r .cell-code  code-line-numbers="false"}
library(flextable)
library(rio)
library(tidyverse)
theme_set(theme_classic(base_size = 14, 
                        base_family = 'serif'))
```
:::



</br>

<div style="font-size: 26px">

::: {.panel-tabset}


### `flextable`

The `flextable` package [@Gohel_etal_2024] helps create pretty tables from R. Can also be used to create publication reaady APA style tables.

### `rio`

The `rio` package [@Becker_etal_2024] developers describe this package as the *Swiss-Army Knife for Data I/O*. The `import()` and `export()` functions can import/export just about any data type.

### `tidyverse`

The `tidyverse` package [@Wickham_RStudio_2023] loads a suite of packages that help with data cleaning and visualization. Among others, `tidyverse` loads both `dplyr` and `ggplot2`.


:::
</div>

:::
::: {.column width="50%"}


<ul>

<li> Let's also load the data for today: </li>
</ul>



::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
GPA <- import("https://github.com/quinix45/PSYC-7804-Regression-Lab-Slides/raw/refs/heads/main/Slides%20Files/Data/GPA.sav")
str(GPA)
```
:::




![](Images/Packages_image.png)

:::
::::

## References 

<div id="refs"> </div>






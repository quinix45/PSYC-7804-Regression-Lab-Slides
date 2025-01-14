---
title: "Lab 3: Significance Tests and Reporting Results"
author: "Fabio Setti"
institute: "PSYC 7804 - Regression with Lab"
bibliography: Additional files/R packages.bib
csl: Additional files/apa.csl
title-slide-attributes:
  data-transition: "zoom"
  data-visibility: "uncounted"
format:
   revealjs:
      footer: "Lab 3: Significance Tests and Reporting Results"
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

# Tidyverse should be already installed
# install.packages("tidyverse")
```
:::

::: {.cell .code-150}

```{.r .cell-code  code-line-numbers="false"}
library(flextable)
library(tidyverse)
theme_set(theme_classic(base_size = 14, 
                        base_family = 'serif'))
```
:::



</br>

<div style="font-size: 26px">

::: {.panel-tabset}
### `flextable`

The `flextable` package [@Gohel_etal_2024] helps create pretty tables from R. Can also be used to create publication ready APA style tables.
:::

</div>

:::
::: {.column width="50%"}


<ul>

<li> Let's also load the [data](https://www.kaggle.com/datasets/mirichoi0218/insurance?resource=download){target="_blank"}
 for today: </li>
</ul>



::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
insurance <- rio::import("https://github.com/quinix45/PSYC-7804-Regression-Lab-Slides/raw/refs/heads/main/Slides%20Files/Data/insurance.csv")

# let's peak at our variables
str(insurance)
```

::: {.cell-output .cell-output-stdout}

```
'data.frame':	1338 obs. of  7 variables:
 $ age     : int  19 18 28 33 32 31 46 37 37 60 ...
 $ sex     : chr  "female" "male" "male" "male" ...
 $ bmi     : num  27.9 33.8 33 22.7 28.9 ...
 $ children: int  0 1 3 0 0 0 1 3 2 0 ...
 $ smoker  : chr  "yes" "no" "no" "no" ...
 $ region  : chr  "southwest" "southeast" "southeast" "northwest" ...
 $ charges : num  16885 1726 4449 21984 3867 ...
```


:::
:::



:::
::::

## Predicting Insurance Charges

Let's find out whether body mass index (`bmi`) predicts health insurance charges (`charges`)


:::: {.columns}
::: {.column width="60%"}



::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
reg <- lm(charges ~ bmi, insurance)
summary(reg)
```

::: {.cell-output .cell-output-stdout}

```

Call:
lm(formula = charges ~ bmi, data = insurance)

Residuals:
   Min     1Q Median     3Q    Max 
-20956  -8118  -3757   4722  49442 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1192.94    1664.80   0.717    0.474    
bmi           393.87      53.25   7.397 2.46e-13 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 11870 on 1336 degrees of freedom
Multiple R-squared:  0.03934,	Adjusted R-squared:  0.03862 
F-statistic: 54.71 on 1 and 1336 DF,  p-value: 2.459e-13
```


:::
:::


:::



::: {.column width="40%"}

::: {.fragment fragment-index=1}

The resulting predicted charge is:

<div style="font-size: 22px">

$\widehat{\mathrm{Charges}}_i = \$1192.94 + \$393.87 \times \mathrm{BMI}_i$

</div>

:::

::: {.fragment fragment-index=2}

Is the intercept meaningful in this case?

:::

</br>

::: {.fragment fragment-index=3}

In practice, before we interpret anything, we need to check the *p*-values associated with our output.  

:::

:::
::::

## *p*-values

Some guy named [R.A. Fisher](https://en.wikipedia.org/wiki/Ronald_Fisher) came up with the idea of *p*-values. The set up goes something like this:

:::: {.columns}
::: {.column width="80%"}

<ol style="font-size: 24px">

::: {.fragment fragment-index=1}
<li> I collected this sample and found that BMI predicts how much insurance will charge. But do these results tell me anything about the [population](https://en.wikipedia.org/wiki/Statistical_population){target="_blank"}? I can't really measure the entire population 🫤 </li>
:::

::: {.fragment fragment-index=2}
<li> 💡 Let's resample from the population and repeat my experiment in *exactly the same way* an infinite number of times and see how often I get my result, a slope of 393.87, *or more*. Let me also assume that in reality there truly is no relation between BMI and insurance charge, and the slope is exactly 0 in reality ($H_0$, the null hypothesis) </li>
:::

::: {.fragment fragment-index=3}
<li> Under the assumptions that the true population slope is exactly 0, the ***p*-value** is the proportion of times that I find a slope of 393.87 or more if I were to repeat exactly the same experiment an infinite number of times. </li>
:::

</ol>



::: {.fragment fragment-index=4}
Fisher, being really good at math and knowing the [central limit theorem](https://gallery.shinyapps.io/CLT_mean/){target="_blank"}
, realized that we don't have to repeat experiments an infinite number of times (ok, thank you Fisher 😌).
:::

:::
::: {.column width="20%"}

<br>

<figure>
  <img src="Images/Fisher2.jpg">
  <figcaption style="font-size: 16px">R. A. Fisher (1890-1962), really good with the maths and stats, but also a pretty bad person</figcaption>
</figure>


:::
::::

## Sampling Distributions

<div style="font-size: 26px">  Given *most* statistics, we can figure out what a distribution of the results of an infinite number of experiments will look like. This is known as the **sampling distribution**, and is the target of significance testing. </div> 


:::: {.columns}
::: {.column width="30%"}

::: {.fragment fragment-index=1}
<div style="font-size: 22px; padding-top: 12px;"> 
If we assume the our slope really should be 0 (i.e., we assume $H_0$ is true), the sampling distribution should look something like the plot on the right:
</div>
:::

<ul style="font-size: 22px">

::: {.fragment fragment-index=2}
<li> Our value for the slope was $393.87$, which is way far off to the right. That means $393.87$ is extremely unlikely to come from a sampling distribution where $H_0$ is true. </li>
:::

::: {.fragment fragment-index=3}
<li> The ***p*-value**, which is $2.46*10^{-13}$, represents the probability of getting our slope (or a value more extreme), from the plot on the right (i.e., if $H_0$ is true). ***p*-values** say nothing about how likely/unlikely $H_1$ is. </li>
:::

</ul>


:::
::: {.column width="70%"}

::: {.fragment fragment-index=1}



::: {.cell}

```{.r .cell-code  code-fold="true" code-summary="Plot code" code-line-numbers="false"}
# you need to install this package 
library(extraDistr)

ggplot() +
  geom_function(fun = dlst, args = list(mu = 0, sigma = 53.25, df = 1336), color = "blue") +
  labs(x = "All the slopes if H0 is true") +
  xlim(-(53.25*3), (53.25*3)) +
  scale_y_continuous(expand = c(0,0)) +
    annotate("text", x = -2, y = .002, 
             label = "The spread of this distribution \n is determined by the stanrdard error of the slope, \n which is 53.25") +
  theme(axis.title.y=element_blank(),
        axis.text.y=element_blank(),
        axis.ticks.y=element_blank(),
        axis.line.y =  element_blank())
```

::: {.cell-output-display}
![](Lab-3_files/figure-revealjs/unnamed-chunk-5-1.png){width=960}
:::
:::


:::
:::
::::


## Where's the T 🍵?

<div style="font-size: 26px"> How did I get a *p*-value without any *t*-value? Although the plot on the previous slide looked like a normal distribution, it was actually a *t*-distribution with $\mu = 0$, $\sigma = 53.25$ and $df = 1336$. Just like any normal distribution, the units can be standardized such that $\sigma = 1$, resulting in the graph below to the right. </div>


:::: {.columns}
::: {.column width="30%"}


::: {.fragment fragment-index=2}
<div style="font-size: 24px; padding-top: 12px;">  This implies also rescaling our slope to get a value that can be place it on the new x-axis, thus we compute the **t-statistic**: </div>


$$t = \frac{b_1}{SE_{b_1}} = \frac{393.87}{53.25} = 7.397 $$




::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
pt(7.397, df = 1336, lower.tail = FALSE)*2
```

::: {.cell-output .cell-output-stdout}

```
[1] 2.451523e-13
```


:::
:::



The *p*-value is the same as the regression output. 
:::

:::
::: {.column width="70%"}

::: {.fragment fragment-index=1}



::: {.cell}

```{.r .cell-code  code-fold="true" code-summary="Plot code" code-line-numbers="false"}
ggplot() +
  geom_function(fun = dt, args = list(df = 1336), color = "blue") +
  labs(x = "All the slopes if H0 is true, but standardized") +
    annotate("text", x = 0, y = .1, 
             label = "Hey, I am still the same distribution \n from the previous slide. People \n like me better when my X-axis \n looks like this!") +
  xlim(-3, 3) +
  scale_y_continuous(expand = c(0,0)) +
  theme(axis.title.y=element_blank(),
        axis.text.y=element_blank(),
        axis.ticks.y=element_blank(),
        axis.line.y =  element_blank())
```

::: {.cell-output-display}
![](Lab-3_files/figure-revealjs/unnamed-chunk-7-1.png){width=960}
:::
:::


:::

:::
::::

## ...And the intercept

<div style="font-size: 26px"> Usually, we don't really care about the intercept, but here it illustrate where *t*-values fall when the corresponding *p*-value is high. </div> 

:::: {.columns}
::: {.column width="30%"}


::: {.fragment fragment-index=1}
<div style="font-size: 24px; padding-top: 18px; padding-bottom: 18px;"> Form the outptut, $t = \frac{b_0}{SE_{b_0}} = \frac{1192.94}{1664.80} = 0.717$. This time, the *t*-value is pretty close to the center of the plot </div>





::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
pt(.717, df = 1336, lower.tail = FALSE)*2
```

::: {.cell-output .cell-output-stdout}

```
[1] 0.4734994
```


:::
:::


:::


<ul style="font-size: 22px">

::: {.fragment fragment-index=3}
<li> So, even by random chance, there is about a $47\%$ chance of getting a value of $1192.94$ *or more extreme*. </li>

**NOTE**: the total area under the curve is $1$, and the shaded area is $0.473$, the *p*-value. </li>
:::
</ul>

:::
::: {.column width="70%"}

::: {.fragment fragment-index=2}



::: {.cell}

```{.r .cell-code  code-fold="true" code-summary="Plot code" code-line-numbers="false"}
ggplot() +
  geom_function(fun = dt, args = list(df = 1336), color = "blue") +
  labs(x = "All the intercepts if H0 is true") +
  geom_vline(xintercept = 0.717, linetype = 2) +
  xlim(-3, 3) +
  annotate("text", x = .25, y = .1, label = "t-value of \n the intercept") +
  annotate("text", x = -2, y = .3, label = "we also look at the \n opposite side, two-tailed test") +
    geom_ribbon(data = data.frame(x = seq(0.717, 4, length.out = 100)), 
              aes(x = x, ymin = 0, ymax = dt(x, df = 1336)), 
              fill = "lightblue", alpha = 0.5) +
  geom_ribbon(data = data.frame(x = seq(-0.717, -4, length.out = 100)), 
              aes(x = x, ymin = 0, ymax = dt(x, df = 1336)), 
              fill = "lightblue", alpha = 0.5) +
  scale_y_continuous(expand = c(0,0)) +
  scale_x_continuous(limits = c(-3, 3), breaks = c(-2, 0, 0.717, 2)) +
  theme(axis.title.y=element_blank(),
        axis.text.y=element_blank(),
        axis.ticks.y=element_blank(),
        axis.line.y =  element_blank())
```

::: {.cell-output-display}
![](Lab-3_files/figure-revealjs/unnamed-chunk-9-1.png){width=960}
:::
:::


:::

:::
::::

## Type I Error Rate and Significance 

*p*-values have meaning even without any significance test. *Significance tests* happen only once we choose to make binary decisions based on *p*-values. At some point some folks decided that $p < .05 =$ *significant*. But,

::: {.fragment fragment-index=1}

> surely, God loves the .06 nearly as much as the .05 [@Rosnow_Rosenthal_1989, p. 1277]

:::

::: {.fragment fragment-index=2}

Type I error rate ($\alpha$) is thus not a bug of significance testing; it's a feature. Turning *p*-values into binary decisions (accept/reject $H_0$) implies that there is always a non-zero chance (the *p*-value being that chance) that our results come from $H_0$ (i.e., we are wrong). 

:::


::: {.fragment fragment-index=3}

So, significance testing is like gambling 🎰, where we think a 1 in 20 or less chances of being wrong is good odds. Sometimes we end up on the wrong side of chance, and we make the wrong conclusion. 
:::

::: {.fragment fragment-index=4}
And slightly unsettling is the fact that you cannot know which of your decisions based on *p*-values is the "wrong" one 😧.  
:::

## Confidence Intervals

We can also easily extract $95\%$ confidence intervals (CIs) for our intercept and slope:

:::: {.columns}
::: {.column width="60%"}



::: {.cell .code-150}

```{.r .cell-code  code-line-numbers="false"}
confint(reg)
```

::: {.cell-output .cell-output-stdout}

```
                 2.5 %    97.5 %
(Intercept) -2072.9743 4458.8487
bmi           289.4089  498.3372
```


:::
:::



:::
::: {.column width="40%"}

::: {.fragment fragment-index=1}
Confidence intervals carry the same information as *p*-values. The respective *p*-value will be significant if the confidence interval does not include 0. 
:::

:::
::::


Now, as mention in the main lecture:


<ul style="font-size: 28px">

::: {.fragment fragment-index=2}
<li> **Incorrect interpretation**: "There is a 95% chance that the true value is within the confidence interval." </li>
:::

::: {.fragment fragment-index=3}
<li> **Correct interpretation**: "If I were to repeat the experiment an infinite number of times, 95% of my observed values would be within the confidence interval." </li>
:::

</ul>

::: {.fragment fragment-index=4}
I will not elaborate further, but see [here](https://stats.stackexchange.com/questions/2272/whats-the-difference-between-a-confidence-interval-and-a-credible-interval){target="_blank"} for more.
:::

## APA Style Report

...ok, I am done rambling, here's how you report the results in APA style:

:::: {.columns}
::: {.column width="50%"}



::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
summary(reg)
```

::: {.cell-output .cell-output-stdout}

```

Call:
lm(formula = charges ~ bmi, data = insurance)

Residuals:
   Min     1Q Median     3Q    Max 
-20956  -8118  -3757   4722  49442 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1192.94    1664.80   0.717    0.474    
bmi           393.87      53.25   7.397 2.46e-13 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 11870 on 1336 degrees of freedom
Multiple R-squared:  0.03934,	Adjusted R-squared:  0.03862 
F-statistic: 54.71 on 1 and 1336 DF,  p-value: 2.459e-13
```


:::
:::




:::

::: {.column width="50%"}

<div style="font-size: 36px"> 
::: {.callout-note}

## APA style report

Simple linear regression analysis indicated that BMI significantly positively predicted insurance charges, *b* = 393.87, *t*(1336) = 7.4, *p* < .001, 95\%CI [289.41; 498.34]. The predictor explained a significant proportion of variance in insurance charges,  *R*<sup>2</sup> = .04, *F*(1, 1336) = 54.71, *p* < .001. 
::: 
</div>

::: {.fragment fragment-index=1}
Although not discussed in this lab, we will return to $R^2$ soon. 
:::

:::
::::


## ANOVA Output

If for some reason you prefer the ANOVA-type outputs, you can also get that for any type of `lm()` regression

:::: {.columns}
::: {.column width="40%"}

<br>



::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
anova(reg)
```

::: {.cell-output .cell-output-stdout}

```
Analysis of Variance Table

Response: charges
            Df     Sum Sq    Mean Sq F value    Pr(>F)    
bmi          1 7.7134e+09 7713391237  54.709 2.459e-13 ***
Residuals 1336 1.8836e+11  140988645                      
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
```


:::
:::



:::

::: {.column width="60%"}

<br>

::: {.fragment fragment-index=1}

Later in the course, we will learn all about how ANOVA is a regression is disguise 🥸. 

:::

<br>

::: {.fragment fragment-index=2}

For now, notice that this ANOVA output provides the same *F*-statistic and *p*-value that were in the output for the $R^2$ on the previous slide. 

:::

:::
::::


## Creating APA Style regression tables

To not have to manually recreate result tables over and over, I created a function that generates APA style regression tables ✨. The  function code is [here](https://github.com/quinix45/PSYC-7804-Regression-Lab-Slides/blob/main/Slides%20Files/R_scripts/Regression_flextable.R){target="_blank"} if you are curious. 


:::: {.columns}
::: {.column width="60%"}



::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
# load the function (`source()` runs R code from other files)
source("https://github.com/quinix45/PSYC-7804-Regression-Lab-Slides/raw/refs/heads/main/Slides%20Files/R_scripts/Regression_flextable.R")

# any regression model
reg_model <- lm(charges ~ bmi + sex, insurance)

# create the table
table <- regression_flextable(reg_model)

# save the table to as a word doc. You should see the files in the `path` argument appear in your working directory
save_as_docx(table, path = "reg_table.docx")
```
:::



::: {.fragment fragment-index=1}
<ul>
<li> The `save_as_...` functions that save the table to a file come from the `flextable` package (really good package 😍). My function also uses functions from `flextable` to format the regression table. </li>
</ul>
:::

:::


::: {.column width="40%"}

::: {.fragment fragment-index=2}

**`regression_flextable()` Arguments**

<ol style="font-size: 24px">
<li> `lm_object`: An `lm()` regression model , title = "", var_names = NULL, intercept = TRUE </li>

<li> `title = ""`: The table title (must be a character). </li>

<li> `var_names = NULL`: Names for first column of the table (the variables). Must be a character vector of the same length of the table rows. </li>


<li> `intercept = TRUE`: Set to `FALSE` if the intercept is not wanted (e.g., for standardized regression). </li>

</ol>
:::
:::

:::
::::


## Table Output

If you open the `reg_table.docx` document that was just saved to your working directory, you should hopefully see a table like the one below

:::: {.columns}
::: {.column width="35%"}

<div style="font-size: 24px"> Usually, you don't want the R variable names as row names. You can change them with the `var_names = ` argument: </div>

<br>
<br>
<br>



::: {.cell .code-125}

```{.r .cell-code  code-line-numbers="false"}
table <- regression_flextable(reg_model,
         var_names = c("Intercept", 
                       "BMI", 
                       "Sex"))

save_as_docx(table, 
       path = "reg_table_names.docx")
```
:::




:::
::: {.column width="65%"}



::: {.cell}
::: {.cell-output-display}

```{=html}
<div class="tabwid"><style>.cl-0417b3d8{}.cl-040815ae{font-family:'Times New Roman';font-size:11pt;font-weight:bold;font-style:normal;text-decoration:none;color:rgba(0, 0, 0, 1.00);background-color:transparent;}.cl-040815c2{font-family:'Times New Roman';font-size:11pt;font-weight:normal;font-style:normal;text-decoration:none;color:rgba(0, 0, 0, 1.00);background-color:transparent;}.cl-04147d1c{margin:0;text-align:center;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);padding-bottom:5pt;padding-top:5pt;padding-left:5pt;padding-right:5pt;line-height: 2;background-color:transparent;}.cl-04149108{width:0.93in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149112{width:0.782in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149113{width:0.75in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149114{width:0.868in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0414911c{width:1.435in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0414911d{width:3.3in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0414911e{width:0.93in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149126{width:0.782in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149127{width:0.75in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149128{width:0.868in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149130{width:1.435in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149131{width:3.3in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149132{width:0.93in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149133{width:0.782in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0414913a{width:0.75in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0414913b{width:0.868in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0414913c{width:1.435in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-04149144{width:3.3in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}</style><table data-quarto-disable-processing='true' class='cl-0417b3d8'><thead><tr style="overflow-wrap:break-word;"><th class="cl-04149108"><p class="cl-04147d1c"><span class="cl-040815ae">Variable</span></p></th><th class="cl-04149112"><p class="cl-04147d1c"><span class="cl-040815ae">B</span></p></th><th class="cl-04149113"><p class="cl-04147d1c"><span class="cl-040815ae">t</span></p></th><th class="cl-04149114"><p class="cl-04147d1c"><span class="cl-040815ae">p</span></p></th><th class="cl-0414911c"><p class="cl-04147d1c"><span class="cl-040815ae">95%CI</span></p></th><th class="cl-0414911d"><p class="cl-04147d1c"><span class="cl-040815ae"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>R</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">R^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.00773em;">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span></p></th></tr></thead><tbody><tr style="overflow-wrap:break-word;"><td class="cl-0414911e"><p class="cl-04147d1c"><span class="cl-040815c2">(Intercept)</span></p></td><td class="cl-04149126"><p class="cl-04147d1c"><span class="cl-040815c2">739.43</span></p></td><td class="cl-04149127"><p class="cl-04147d1c"><span class="cl-040815c2">0.44</span></p></td><td class="cl-04149128"><p class="cl-04147d1c"><span class="cl-040815c2">0.66</span></p></td><td class="cl-04149130"><p class="cl-04147d1c"><span class="cl-040815c2">[-2561.1; 4039.97]</span></p></td><td class="cl-04149131"><p class="cl-04147d1c"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" data-external="1"><span class="cl-040815c2"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow></mrow><annotation encoding="application/x-tex"></annotation></semantics></math></span><span class="katex-html" aria-hidden="true"></span></span></span></p></td></tr><tr style="overflow-wrap:break-word;"><td class="cl-0414911e"><p class="cl-04147d1c"><span class="cl-040815c2">bmi</span></p></td><td class="cl-04149126"><p class="cl-04147d1c"><span class="cl-040815c2">389.43</span></p></td><td class="cl-04149127"><p class="cl-04147d1c"><span class="cl-040815c2">7.31</span></p></td><td class="cl-04149128"><p class="cl-04147d1c"><span class="cl-040815c2">&lt;.001***</span></p></td><td class="cl-04149130"><p class="cl-04147d1c"><span class="cl-040815c2">[284.95; 493.92]</span></p></td><td class="cl-04149131"><p class="cl-04147d1c"><span class="cl-040815c2"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow></mrow><annotation encoding="application/x-tex"></annotation></semantics></math></span><span class="katex-html" aria-hidden="true"></span></span></span></p></td></tr><tr style="overflow-wrap:break-word;"><td class="cl-04149132"><p class="cl-04147d1c"><span class="cl-040815c2">sexmale</span></p></td><td class="cl-04149133"><p class="cl-04147d1c"><span class="cl-040815c2">1166.99</span></p></td><td class="cl-0414913a"><p class="cl-04147d1c"><span class="cl-040815c2">1.8</span></p></td><td class="cl-0414913b"><p class="cl-04147d1c"><span class="cl-040815c2">0.073</span></p></td><td class="cl-0414913c"><p class="cl-04147d1c"><span class="cl-040815c2">[-106.99; 2440.98]</span></p></td><td class="cl-04149144"><p class="cl-04147d1c"><span class="cl-040815c2"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>R</mi><mn>2</mn></msup><mo>=</mo><mn>0.04</mn><mo separator="true">,</mo><mi>F</mi><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1335</mn><mo stretchy="false">)</mo><mo>=</mo><mn>29.01</mn><mo separator="true">,</mo><mi>p</mi><mo>&lt;</mo><mi mathvariant="normal">.</mi><mn>00</mn><msup><mn>1</mn><mrow><mo>∗</mo><mo>∗</mo><mo>∗</mo></mrow></msup></mrow><annotation encoding="application/x-tex">R^2=0.04,F(2,1335)=29.01,p&lt;.001^{***}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.00773em;">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">0.04</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">1335</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord">29.01</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">p</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6887em;"></span><span class="mord">.00</span><span class="mord"><span class="mord">1</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6887em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">∗∗∗</span></span></span></span></span></span></span></span></span></span></span></span></span></p></td></tr></tbody></table></div>
```

:::
:::



<ul style="font-size: 24px">
<li> Updated row names: </li>
</ul>



::: {.cell}
::: {.cell-output-display}

```{=html}
<div class="tabwid"><style>.cl-042d49d2{}.cl-0426f8ac{font-family:'Times New Roman';font-size:11pt;font-weight:bold;font-style:normal;text-decoration:none;color:rgba(0, 0, 0, 1.00);background-color:transparent;}.cl-0426f8b6{font-family:'Times New Roman';font-size:11pt;font-weight:normal;font-style:normal;text-decoration:none;color:rgba(0, 0, 0, 1.00);background-color:transparent;}.cl-0429af02{margin:0;text-align:center;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);padding-bottom:5pt;padding-top:5pt;padding-left:5pt;padding-right:5pt;line-height: 2;background-color:transparent;}.cl-0429c17c{width:0.828in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c186{width:0.782in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c190{width:0.75in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c191{width:0.868in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c19a{width:1.435in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c19b{width:3.3in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0.75pt solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c19c{width:0.828in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c19d{width:0.782in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1a4{width:0.75in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1a5{width:0.868in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1a6{width:1.435in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1a7{width:3.3in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1a8{width:0.828in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1ae{width:0.782in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1af{width:0.75in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1b0{width:0.868in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1b8{width:1.435in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-0429c1b9{width:3.3in;background-color:transparent;vertical-align: middle;border-bottom: 0.75pt solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}</style><table data-quarto-disable-processing='true' class='cl-042d49d2'><thead><tr style="overflow-wrap:break-word;"><th class="cl-0429c17c"><p class="cl-0429af02"><span class="cl-0426f8ac">Variable</span></p></th><th class="cl-0429c186"><p class="cl-0429af02"><span class="cl-0426f8ac">B</span></p></th><th class="cl-0429c190"><p class="cl-0429af02"><span class="cl-0426f8ac">t</span></p></th><th class="cl-0429c191"><p class="cl-0429af02"><span class="cl-0426f8ac">p</span></p></th><th class="cl-0429c19a"><p class="cl-0429af02"><span class="cl-0426f8ac">95%CI</span></p></th><th class="cl-0429c19b"><p class="cl-0429af02"><span class="cl-0426f8ac"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>R</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">R^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.00773em;">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span></p></th></tr></thead><tbody><tr style="overflow-wrap:break-word;"><td class="cl-0429c19c"><p class="cl-0429af02"><span class="cl-0426f8b6">Intercept</span></p></td><td class="cl-0429c19d"><p class="cl-0429af02"><span class="cl-0426f8b6">739.43</span></p></td><td class="cl-0429c1a4"><p class="cl-0429af02"><span class="cl-0426f8b6">0.44</span></p></td><td class="cl-0429c1a5"><p class="cl-0429af02"><span class="cl-0426f8b6">0.66</span></p></td><td class="cl-0429c1a6"><p class="cl-0429af02"><span class="cl-0426f8b6">[-2561.1; 4039.97]</span></p></td><td class="cl-0429c1a7"><p class="cl-0429af02"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" data-external="1"><span class="cl-0426f8b6"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow></mrow><annotation encoding="application/x-tex"></annotation></semantics></math></span><span class="katex-html" aria-hidden="true"></span></span></span></p></td></tr><tr style="overflow-wrap:break-word;"><td class="cl-0429c19c"><p class="cl-0429af02"><span class="cl-0426f8b6">BMI</span></p></td><td class="cl-0429c19d"><p class="cl-0429af02"><span class="cl-0426f8b6">389.43</span></p></td><td class="cl-0429c1a4"><p class="cl-0429af02"><span class="cl-0426f8b6">7.31</span></p></td><td class="cl-0429c1a5"><p class="cl-0429af02"><span class="cl-0426f8b6">&lt;.001***</span></p></td><td class="cl-0429c1a6"><p class="cl-0429af02"><span class="cl-0426f8b6">[284.95; 493.92]</span></p></td><td class="cl-0429c1a7"><p class="cl-0429af02"><span class="cl-0426f8b6"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow></mrow><annotation encoding="application/x-tex"></annotation></semantics></math></span><span class="katex-html" aria-hidden="true"></span></span></span></p></td></tr><tr style="overflow-wrap:break-word;"><td class="cl-0429c1a8"><p class="cl-0429af02"><span class="cl-0426f8b6">Sex</span></p></td><td class="cl-0429c1ae"><p class="cl-0429af02"><span class="cl-0426f8b6">1166.99</span></p></td><td class="cl-0429c1af"><p class="cl-0429af02"><span class="cl-0426f8b6">1.8</span></p></td><td class="cl-0429c1b0"><p class="cl-0429af02"><span class="cl-0426f8b6">0.073</span></p></td><td class="cl-0429c1b8"><p class="cl-0429af02"><span class="cl-0426f8b6">[-106.99; 2440.98]</span></p></td><td class="cl-0429c1b9"><p class="cl-0429af02"><span class="cl-0426f8b6"><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>R</mi><mn>2</mn></msup><mo>=</mo><mn>0.04</mn><mo separator="true">,</mo><mi>F</mi><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1335</mn><mo stretchy="false">)</mo><mo>=</mo><mn>29.01</mn><mo separator="true">,</mo><mi>p</mi><mo>&lt;</mo><mi mathvariant="normal">.</mi><mn>00</mn><msup><mn>1</mn><mrow><mo>∗</mo><mo>∗</mo><mo>∗</mo></mrow></msup></mrow><annotation encoding="application/x-tex">R^2=0.04,F(2,1335)=29.01,p&lt;.001^{***}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.00773em;">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">0.04</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">1335</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord">29.01</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">p</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6887em;"></span><span class="mord">.00</span><span class="mord"><span class="mord">1</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6887em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">∗∗∗</span></span></span></span></span></span></span></span></span></span></span></span></span></p></td></tr></tbody></table></div>
```

:::
:::




:::
::::





## References 

<div id="refs"> </div>






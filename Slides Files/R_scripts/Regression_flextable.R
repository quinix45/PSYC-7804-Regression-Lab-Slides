regression_flextable <- function(lm_object, title = "", var_names = NULL, intercept = TRUE)
{
  
  require(tidyverse, quietly = TRUE)
  require(flextable, quietly = TRUE)
  
  
  lm_summary <- summary(lm_object)
  
  if(isTRUE(intercept))
    {
    lm_CI <- round(confint(lm_object),2)
    lm_summary$coefficients <- lm_summary$coefficients[,-c(2)] 
    } 
  else 
    {
  lm_CI <- round(confint(lm_object)[-1,],2)
  lm_summary$coefficients <- lm_summary$coefficients[-1,-c(2)] 
    }
  
  
  lm_tab <- data.frame(cbind(row.names(lm_summary$coefficients), 
                             round(lm_summary$coefficients[,1:2], 2),
                             round(lm_summary$coefficients[,3], 3),
                             paste0("[",lm_CI[,1],"; ",
                                    lm_CI[,2], "]"),
                             c(rep(NA, nrow(lm_CI)-1), 
                               paste0("R^2=", 
                                      round(lm_summary$r.squared, 2), 
                                      ",F(", 
                                      lm_summary$fstatistic[2], 
                                      ",",
                                      lm_summary$fstatistic[3],
                                      ")=", 
                                      round(lm_summary$fstatistic[1], 2),
                                      ",p<",
                                      round(pf(lm_summary$fstatistic[1], 
                                               lm_summary$fstatistic[2], 
                                               lm_summary$fstatistic[3], 
                                               lower.tail = FALSE),3)))))
  
  colnames(lm_tab) <- c("Variable", "B", "t", "p", "95%CI", "R^2")
  
  
  lm_tab$p <- as.numeric(ifelse(lm_tab$p == "0", .001, lm_tab$p))
  
  lm_tab$p[lm_tab$p < .05 & lm_tab$p >.01] <- paste0(lm_tab$p[lm_tab$p < .05 & lm_tab$p >.01], "*")
  lm_tab$p[lm_tab$p < .01 & lm_tab$p >.001] <- paste0(lm_tab$p[lm_tab$p < .01 & lm_tab$p >.001], "**")
  lm_tab$p[lm_tab$p <= .001] <- "<.001***"
  
  
  
  # change variable names if supplied
  
  if(is.null(var_names) == FALSE)
  {
    lm_tab$Variable <- var_names
  }
  
  
  # remove NA
  
  lm_tab[is.na(lm_tab)] <- ""  
  
  
  ft <- flextable(lm_tab)
  ft <- ft %>% 
    flextable::compose(j = "R^2", value = as_paragraph(as_equation(lm_tab[,6]))) %>% 
    flextable::compose(j = "R^2", part = "header" , value = as_paragraph(as_equation("R^2"))) %>% 
    bold(bold = TRUE, part = "header") %>% 
    line_spacing(space = 1.5, part = "all") %>% 
    set_caption(caption = title) %>% 
    font(fontname = "Times New Roman", part = "all") %>% 
    autofit()
  
  return(ft)
}

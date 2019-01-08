library(randomForest)
fitbitdata <- read.csv("data.csv", header=FALSE, colClasses = c("factor"))
set.seed(100)
# Random Forest relative importance of variables as predictors
forest <- randomForest(V4 ~ V1 + V2 + V3, data=fitbitdata, ntree=2000, keep.forest=TRUE, importance=TRUE)
importance(forest) # relative importance of predictors (highest <-> most important)
varImpPlot(forest) # plot results
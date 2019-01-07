library(randomForestExplainer)

# find distribution of minimal depth
min_depth_frame <- min_depth_distribution(forest)
save(min_depth_frame, file = "min_depth_frame.rda")
load("min_depth_frame.rda")
head(min_depth_frame, n = 10)

# get variable importance measures
importance_frame <- measure_importance(forest)
save(importance_frame, file = "importance_frame.rda")
load("importance_frame.rda")
importance_frame

plot_multi_way_importance(importance_frame, size_measure = "no_of_nodes")

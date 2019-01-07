const IrisDataset = require('ml-dataset-iris');
const RFClassifier = require('ml-random-forest').RandomForestClassifier;

const trainingSet = IrisDataset.getNumbers();
const predictions = IrisDataset.getClasses().map(
    (elem) => IrisDataset.getDistinctClasses().indexOf(elem)
);

const options = {
    seed: 3,
    maxFeatures: 0.8,
    replacement: true,
    nEstimators: 25
};

const classifier = new RFClassifier(options);
classifier.train(trainingSet, predictions);
const result = classifier.predict(trainingSet);
console.log(result === predictions);
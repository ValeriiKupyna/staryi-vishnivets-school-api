function getSchoolDetails(req, res) {
    const {app: {locals: {detailsCollection}}} = req;

    detailsCollection
        .find({})
        .toArray()
        .then((data) => res.status(200).json(data[0]))
        .catch((error) => res.status(500).json(error));
}

module.exports = {
    getSchoolDetails
};
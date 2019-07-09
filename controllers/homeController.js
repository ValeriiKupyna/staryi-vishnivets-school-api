function getWelcomeInfo(req, res) {
    const {app: {locals: {welcomeCollection}}} = req;

    welcomeCollection
        .find({})
        .toArray()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json(error));
}

module.exports = {
    getWelcomeInfo
};
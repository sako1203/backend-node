router.get("/recherche", async (req, res) => {

const { nom, date } = req.query;

const result = await Sinistre.findAll({
include: [Victime, Medecin, Enqueteur, ResponsableLocal],
where: {
...(nom && { nomVictime: nom }),
...(date && { dateAccident: date })
}
});

res.json(result);

});
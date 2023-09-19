const i18n = {
    'Item.Purchase.family_farm': 'Ferme familiale',
    'Item.Purchase.general_store': 'Magasin général',
    'Item.Purchase.furniture_store': 'Boutique de meubles',
    'Item.Purchase.city_hall': 'Mairie',
    'Item.Purchase.tavern': 'Taverne',
    'Item.Purchase.auni': 'Auni',
    'Item.Purchase.badruu': 'Badruu',
    'Item.Purchase.einar': 'Einar',
    'Item.Purchase.hassian': 'Hassian',
    'Item.Purchase.hodari': 'Hodari',
    'Item.Purchase.reth': 'Reth',
    'Item.Purchase.tish': 'Tish',
};

export default {
    trans(t, d = null) {
        const k = [d, t].join('.');
        return (i18n[k]) ? i18n[k] : k;
    }
}
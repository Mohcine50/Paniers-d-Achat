# Panier d'achat

Ce repository contient deux branches :

### Main (Frontend)

Il s'agit de la partie frontend de l'application. Pour l'exécuter, suivez ces étapes :

- Installez les dépendances :  
  `npm install`

- Démarrez le serveur :  
  `npm run dev`

### Backend

Cela contient l'API Express.js. Pour l'exécuter, suivez ces étapes :

- Installez les dépendances :  
  `npm install`

- Démarrez le serveur :  
  `npm run start`

## Documentation de l'API

Notre  API contient trois endpoints :

### GET /products

Renvoie une liste de produits. Exemple de réponse :

```json
[
  {
    "_id": "6750ae0c9ae4cf28886861bb",
    "ProductID": 1,
    "ProductName": "Smartphone",
    "Category": "Electronics",
    "Price": 91.31,
    "salesCount": 2880
  },
  {
    "_id": "6750ae0c9ae4cf28886861bc",
    "ProductID": 2,
    "ProductName": "Laptop",
    "Category": "Electronics",
    "Price": 468.75,
    "salesCount": 2875
  },
  {
    "_id": "6750ae0c9ae4cf28886861bd",
    "ProductID": 3,
    "ProductName": "Tablet",
    "Category": "Electronics",
    "Price": 158.87,
    "salesCount": 2913
  }
]
```

Vous pouvez filtrer les résultats par durée en utilisant un paramètre URL (par exemple, `/analytics/total_sales?duration=year`). Les durées disponibles sont :

    week (pour la dernière semaine),
    month (pour le dernier mois),
    year (pour l'année dernière).

Si aucun paramètre n'est fourni, le résultat montrera les données pour toute la période.

### GET /analytics/total_sales

 Exemple de réponse :
 
```json
{
  "totalSales": 265593582.71,
  "totalOrders": 189584,
  "totalProducts": 100,
  "totalCategories": 5
}
```
### GET /analytics/trending_products

 Exemple de réponse :

```json
[
  {
    "_id": 53,
    "productName": "Keyboard",
    "totalQuantitySold": 11312,
    "totalSalesAmount": 2876388.39
  },
  {
    "_id": 96,
    "productName": "Water Bottle",
    "totalQuantitySold": 11059,
    "totalSalesAmount": 2794572.74
  }
]
```

### GET /analytics/category_sales
 Exemple de réponse :

```json
[
  {
    "salesCount": 37707,
    "category": "Books",
    "percentage": 19.89
  },
  {
    "salesCount": 37877,
    "category": "Home & Kitchen",
    "percentage": 19.98
  }
]
```







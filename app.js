const express = require('express');
const fs = require('fs');
const { randomUUID } = require('crypto')
const app = express();
const port = 3000;

app.use(express.json());

let products = [];

fs.readFile("productDB.json", "utf-8", (err, data) => {

    if(err) {

        console.log(err);

    } else {

        products = JSON.parse(data)

    }

})

/**
    POST => Inserir um dado
    GET => Buscar um/mais dados
    PUT => Alterar um dado
    DELETE => Remover um dado
 */
/**
    Body => Sempre que eu quiser enviar dados para minha aplicação
    Params => /product/23516644162
    Query => /product?id=454545542424&value=561112121534
 */
app.post('/products', (req, res) => {

    // Nome e preço => name e price
    const { name, price } = req.body;

    const product = {

        name,
        price,
        id: randomUUID()

    };
    
    products.push(product);
  
    productFile();

    return res.json(product)

});

app.get('/products', (req, res) => {

    return res.json(products);

});

app.get('/products/:id', (req, res) => {

    const { id } = req.params;
    const product = products.find(product => product.id === id);
    return res.json(product);

})

app.put('/products/:id', (req, res) => {

    const { id } = req.params;
    const { name, price } = req.body;
    
    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {

        ...products[productIndex],
        name,
        price

    }

    productFile();

    return res.json({message: "Produto alterado com sucesso!"})

})

app.delete('/products/:id', (req, res) => {

    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    productFile();

    return res.json({message: "Produto removido com sucesso!"})

})

function productFile() {

    fs.writeFile('productDB.json', JSON.stringify(products), (err) => {

        if(err) {

            console.log(err)

        } else {

            console.log('Produto Inserido!')

        }

    })

}

app.listen(port, () => console.log(`Servidor Rodando! Iniciado na porta ${port}`));
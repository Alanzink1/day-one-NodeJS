const http = require('http');
const port = 3000;

http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if(req.url === '/products') {

        res.end(JSON.stringify({

            message: "Rota de Produtos!"

        }))

    }

    if(req.url === '/users') {

        res.end(JSON.stringify({

            message: "Rota de Usuários!"

        }))

    }

    res.end(JSON.stringify({

        message: "Qualquer outra Rota!"

    }))

})
.listen(port, () => console.log(`Servidor Iniciado! Rodando na porta ${port}`))
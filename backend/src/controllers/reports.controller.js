const db = require('../config/database');
const ejs = require('ejs');
const path = require('path');
const api = require('../service/api');
const puppeteer = require('puppeteer');

// ==> Método responsável por gerar o relatório de movimentações por tipo e período:
exports.printMovsByType = async (req, res) => {

    const movementType = parseInt(req.params.id);
    const dtInicio = req.params.dtIni;
    const dtFim = req.params.dtFim;

    let movements = [];
    
    await api.get(`/movements/type/${movementType}/${dtInicio}/${dtFim}`)
    .then(response => {
        movements = response.data
    });


    

    const filePath = path.join(__dirname, "../", "prints", "print.ejs");

    ejs.renderFile(filePath, { movements }, (err, data) => {
            if (err) {
                return res.send('Erro na leitura do arquivo')
            }
             return res.send(data);
            })

  };

  exports.printPDF = async (req, res) => {
    const browser = await puppeteer.launch({ headless:true });
    const page = await browser.newPage();

    await page.goto(`http://localhost:3333/reports/${req.params.id}/${req.params.dtIni}/${req.params.dtFim}`, {
        waitUntil: 'networkidle0' 
    })
    
    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "40px"
        }
    })

    await browser.close();

    res.contentType("application/pdf");

    return res.send(pdf);

  }
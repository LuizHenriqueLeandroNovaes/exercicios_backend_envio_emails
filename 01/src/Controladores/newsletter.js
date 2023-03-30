const knex = require('../conexoes/postgres');
const compiladorHtml = require('../utios/CompiladorHTML');
const transportador = require('../conexoes/nodemailer');

const cadastrarEmail = async(req,res) => {

    const{ nome , email  } = req.body;

    try {
        await knex('emails').insert({
            nome,
            email,
        })
        
    } catch (error) {
        
        return res.status(500).json(
            { mensagem: 'Erro interno do servidor' }
        );
        
    }
    
    return res.status(201).json(
        { mensagem: 'cadastro efetuado com sucesso' }
    );
}    

const enviarNewsletter = async (req,res) => {

    const {texto} = req.body;
    
    try {
        const emails = await knex('emails');

        for (const email of emails) {

            const htmlNewsletter =  
            await compiladorHtml('./src/templates/newsletter.html',
            {
                usuario: email.nome,
                texto: texto,
            });
            
            transportador.sendMail({
                from: 'henrique <henrique.novaes93@gmail.com>',
                to : `${email.nome} <${email.email}>`,
                subject: 'Newsletter Cubos Academy',
                html:htmlNewsletter,
            });
        }
        
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json(
            { mensagem: 'Erro interno do servidor' }
        );
    }

}

module.exports = {
    cadastrarEmail,
    enviarNewsletter
};


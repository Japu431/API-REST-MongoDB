const express = require('express');
const router = express.Router();

const Person = require('../models/Person');

router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(500)
            .json({ message: `Deu erro no sistema!! > ${error}` })

    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const person = await Person.findOne({ _id: id });

        if (!person) {
            res.status(422).json({ message: "O usuário não foi encontrado..." });
            return;
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500)
            .json({ message: `Deu erro no sistema!! > ${error}` })
    }
})


// Create Data
router.post('/', async (req, res) => {
    // Desestruturar o objeto;
    const { name, salary, approved } = req.body;

    if (!name) {
        res.status(422)
            .json({ error: `O campo nome precisa ser preenchido!!!` });
        return;
    }

    const person = {
        name,
        salary,
        approved
    };

    try {
        await Person.create(person)
        res.status(201)
            .json({ message: "Pessoa inserida no sistema com sucesso!!" });

    } catch (error) {
        res.status(500)
            .json({ message: `Deu erro no sistema!! > ${error}` })

    }
})

// Update - att dados ( PUT - Objeto Completo , PATCH - Objeto Parcial );

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, salary, approved } = req.body;

    const person = { name, salary, approved };
    try {
        const updatePerson = await Person.updateOne({ _id: id }, person);

        // If the data not was updated
        if (updatePerson.matchedCount == 0) {
            res.status(422).json({ message: "O usuário não foi encontrado..." });
            return;
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500)
            .json({ message: `Deu erro no sistema!! > ${error}` })
    }

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const person = await Person.findOne({ _id: id });
    if (!person) {
        res.status(422).json({ message: "O usuário não foi encontrado..." });
        return;
    }

    try {
        await Person.deleteOne({ _id: id });
        res.status(200).json({ message: "Usuário removido do sistema com sucesso!!!" });

    } catch (error) {
        res.status(500)
            .json({ message: `Deu erro no sistema!! > ${error}` })
    }
})



module.exports = router;
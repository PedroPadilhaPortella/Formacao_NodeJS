const mongoose = require('mongoose');
const articleSchema = require('./article')

mongoose.connect('mongodb://localhost:27017/learnMongo', {})

const Article = mongoose.model('Article', articleSchema);

//Adicionando um novo artigo
// const article = new Article({
//     title: 'MongoDB',
//     author: 'Pedro Portella',
//     body: 'MongoDB is noSQL database',
//     date: Date.now(),
//     resume: { content: 'MongoDB is a document database...', author: 'Pedro Portella' },
//     special: false,
// });

// article.save()
//     .then(result => console.log(result))
//     .catch(err => console.log(err))

// Listando os artigos
// Article.find({ author: 'Pedro Portella' })
//     .then(articles => console.log(articles))
//     .catch(err => console.log(err));

// Article.findOne({ _id: '62af477a21cb16cd5a00e568' })
//     .then(articles => console.log(articles))
//     .catch(err => console.log(err));

// Deletando documentos
// Article.findByIdAndDelete({ _id: '62af477a21cb16cd5a00e568' })
//     .then(articles => console.log(articles))
//     .catch(err => console.log(err));

// Atualizando documentos
Article.findByIdAndUpdate('62aee4a3099c60b773c3df57', { title: 'Aprenda Java com Spring Boot' })
    .then(articles => console.log(articles))
    .catch(err => console.log(err));
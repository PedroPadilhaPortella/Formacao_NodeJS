function generateLinks(data) {
    const hateoas = [];

    data.forEach(link => hateoas.push({ 
        href: `http:localhost:3000/${link.href}`, 
        method: link.method, 
        rel: link.rel 
    }));

    return hateoas;
}

module.exports = { generateLinks }
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { stringify } = require('querystring');

const app = express()
app.use(bodyParser.json());

// Database awal (diluncurkan saat server dinyalakan)
let movies = JSON.parse(fs.readFileSync('movies.json'));

// Menampilkan list semua film di bioskop
app.get('/ARC-XXI', (req, res) => 
{
    res.json(movies);
});


// Menampilkan film berdasarkan ID
app.get('/ARC-XXI/:imdbID', (req, res) => 
{
    const idFilm = req.params.imdbID;
    const film = movies.find(film => film.imdbID === parseInt(idFilm));
    if (!film)
    {
        res.status(404).send('Maaf, film tidak dapat ditemukan');
    }
    else 
    {
        res.json(film);
    }
})

// Menambahkan film ke database dengan ID sesuai keinginan user
app.post('/ARC-XXI', (req, res) => 
{
    const filmBaru = req.body;
    movies.push(filmBaru);
    saveDatabase();
    res.send('Film telah ditambahkan ke dalam database');
  });

// Menghapus film dari database berdasarkan ID
app.delete('/ARC-XXI/:imdbID', (req, res) => 
{
    const idFilm = req.params.imdbID;
    film = movies.filter(film => film.imdbID !== parseInt(idFilm));
    saveDatabase();
    res.send('Film telah diihapus dari database');
})

// Melakukan update pada film berdasarkan id pada request
app.put('/ARC-XXI/:imdbID', (req, res) => {
    const idFilm = req.params.imdbID;
    const filmUpdate = req.body;
    film = movies.map(film => {
        if (film.imdbID === parseInt(idFilm)){
            return {
                ...film,
                ...filmUpdate
            };
        }
        return film;
    });
    saveDatabase();
    res.send('Film berhasil diupdate!')
})

// Melakukan search film berdasarkan nama film
app.get('/ARC-XXI/search/:Title', (req, res) => {
    const inputPencarian = req.params.Title.toLowerCase();
    const filmDicari = movies.filter(film => film.Title.toLowerCase().includes(inputPencarian));
    res.json(filmDicari);
})

//Menyimpan semua perubahan yang dilakukan ke dalam file JSON saat server dimatikan
process.on('SIGINT', () => {
    saveDatabase();
    process.exit();
})

// Fungsi untuk menyimpan database
function saveDatabase(){
    fs.writeSync('movies.json'.JSON, stringify(movies, null, 2));
}

// Menjalankan server
app.listen(8080, () => 
{
    console.log(`Server sedang berjalan di http://localhost:8080/ARC-XXI`);
});
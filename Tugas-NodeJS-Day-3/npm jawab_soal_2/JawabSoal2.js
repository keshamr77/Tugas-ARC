const { stdin, stdout } = process;
const input = stdin;
const output = stdout;

const list = [];

function displayList() {
  console.log("Playlist Anda:");
  list.forEach((namaLagu, urutanLaguDalamList) => {
    console.log(`${urutanLaguDalamList + 1}. ${namaLagu}`);
  });
}

function addItem(namaLagu, callback) {
  list.push(namaLagu);
  callback();
}

function removeItem(urutanLaguDalamList, callback) {
  list.splice(urutanLaguDalamList, 1);
  callback();
}

function prompt(question) {
  return new Promise((resolve) => {
    output.write(question);
    input.once('data', (data) => {
      resolve(data.toString().trim());
    });
  });
}

async function main() {
  console.log('Masukkan Lagu Kedalam Playlist Anda. Commands: add <namaLagu>, remove <urutanLaguDalamList>, display, exit');
  
  while (true) {
    const userInput = await prompt('$ ');

    if (userInput === 'exit') {
      console.log('Exiting program.....');
      process.exit(0);
    } else if (userInput === 'display') {
      displayList();
    } else if (userInput.startsWith('add ')) {
      const laguBaru= userInput.substring(4);
      addItem(laguBaru, () => console.log(`Telah menambahkan "${laguBaru}" ke dalam playlist.`));
    } else if (userInput.startsWith('remove ')) {
      const urutanLaguDalamList = parseInt(userInput.substring(7));
      if (!isNaN(urutanLaguDalamList) && urutanLaguDalamList >= 1 && urutanLaguDalamList <= list.length) {
        const hapusLagu = list[urutanLaguDalamList - 1];
        removeItem(urutanLaguDalamList - 1, () => console.log(`Menghapus "${hapusLagu}" dari playlist.`));
      } else {
        console.log('Lagu tidak ditemukan di dalam playlist.');
      }
    } else {
      console.log('Command tidak valid. Commands: add <namaLagu>, remove <urutanLaguDalamList>, display, exit');
    }
  }
}

main();

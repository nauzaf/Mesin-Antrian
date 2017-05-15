var audio = {};

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

audio.terbilang = function( bilangan,  loket)
{
     var angka = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
        '0', '0', '0'];
     var kata = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh',
        'delapan', 'sembilan'];
     var tingkat = ['', 'ribu ', 'juta ', 'milyar ', 'triliun '];

     var panjang_bilangan = bilangan.length;

     var lok = "";

    /* pengujian panjang bilangan */
    if ( panjang_bilangan > 15)
    {
        return "Diluar Batas";
        // return  kalimat;
    }

    /* mengambil angka-angka yang ada dalam bilangan,
    dimasukkan ke dalam array */
    for ( var i = 0;  i <=  panjang_bilangan;  i++)
    {
         angka[i] = bilangan.substr(-(i), 1);
    }

     var i = 1;
     var j = 0;
     var kalimat = "";


    /* mulai proses iterasi terhadap array angka */
    while ( i <=  panjang_bilangan)
    {
         var subkalimat = "";
         var kata1 = "";
         var kata2 = "";
         var kata3 = "";

        /* untuk ratusan */
        if ( angka[ i + 2] != "0")
        {
            if ( angka[ i + 2] == "1")
            {
                 kata1 = "seratus";
            }
            else
            {
                 kata1 =  kata[angka[i + 2]] + " ratus";
            }
        }

        /* untuk puluhan atau belasan */
        if ( angka[ i + 1] != "0")
        {
            if ( angka[ i + 1] == "1")
            {
                if ( angka[ i] == "0")
                {
                     kata2 = "sepuluh";
                }
                else if ( angka[ i] == "1")
                {
                     kata2 = "sebelas";
                }
                else
                {
                     kata2 =  kata[ angka[ i]] + " belas";
                }
            }
            else
            {
                 kata2 =  kata[ angka[ i + 1]] + " puluh";
            }
        }

        /* untuk satuan */
        if ( angka[ i] != "0")
        {
            if ( angka[ i + 1] != "1")
            {
                 kata3 =  kata[ angka[ i]];
            }
        }

        /* pengujian angka apakah tidak nol semua,
        lalu ditambahkan tingkat */
        if (( angka[ i] != "0") || ( angka[ i + 1] != "0") || ( angka[ i + 2] != "0"))
        {
             subkalimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j];
        }

        /* gabungkan variabe sub kalimat (untuk satu blok 3 angka)
        ke variabel kalimat */
         kalimat =  subkalimat +  kalimat;
         i =  i + 3;
         j =  j + 1;
    }

    /* mengganti satu ribu jadi seribu jika diperlukan */
    if (( angka[5] == "0") && ( angka[6] == "0"))
    {
         kalimat = kalimat.replace("satu ribu", "seribu ");
    }
    var go = "";
    if (loket==1) {
        go="satu"
    }
    else if (loket==2) {
        go="dua"
    }
    else if (loket==3) {
        go="tiga"
    }
    else if (loket==4) {
        go="empat"
    }
    else if (loket==5) {
        go="lima"
    }
    else if (loket==6) {
        go="enam"
    }
    else if (loket==7) {
        go="tujuh"
    }
    else if (loket==8) {
        go="delapan"
    }

    var transcript = ("bel antri "+kalimat+"loket "+go).trim().split(" ");
    transcript = cleanArray(transcript);
    return transcript;
}

module.exports=audio;
<?php
/**
 * @package : TerbilangSuara
 * @author  : Gibransyah (http://zona90.wordpress.com)
 * @version : v0.1
 * @date    : 15 November 2009
 */


/**
 *Merubah bilangan ke dalam bentuk teks
 *contoh : 1024 -> seribu dua puluh empat
 *http://daunsalam.net/artikel/terbilang.htm
*/
function terbilang($bilangan, $loket)
{
    $angka = array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
        '0', '0', '0');
    $kata = array('', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh',
        'delapan', 'sembilan');
    $tingkat = array('', 'ribu', 'juta', 'milyar', 'triliun');

    $panjang_bilangan = strlen($bilangan);

    /* pengujian panjang bilangan */
    if ($panjang_bilangan > 15)
    {
        $kalimat = "Diluar Batas";
        return $kalimat;
    }

    /* mengambil angka-angka yang ada dalam bilangan,
    dimasukkan ke dalam array */
    for ($i = 1; $i <= $panjang_bilangan; $i++)
    {
        $angka[$i] = substr($bilangan, -($i), 1);
    }

    $i = 1;
    $j = 0;
    $kalimat = "";


    /* mulai proses iterasi terhadap array angka */
    while ($i <= $panjang_bilangan)
    {
        $subkalimat = "";
        $kata1 = "";
        $kata2 = "";
        $kata3 = "";

        /* untuk ratusan */
        if ($angka[$i + 2] != "0")
        {
            if ($angka[$i + 2] == "1")
            {
                $kata1 = "seratus";
            }
            else
            {
                $kata1 = $kata[$angka[$i + 2]] . " ratus";
            }
        }

        /* untuk puluhan atau belasan */
        if ($angka[$i + 1] != "0")
        {
            if ($angka[$i + 1] == "1")
            {
                if ($angka[$i] == "0")
                {
                    $kata2 = "sepuluh";
                }
                elseif ($angka[$i] == "1")
                {
                    $kata2 = "sebelas";
                }
                else
                {
                    $kata2 = $kata[$angka[$i]] . " belas";
                }
            }
            else
            {
                $kata2 = $kata[$angka[$i + 1]] . " puluh";
            }
        }

        /* untuk satuan */
        if ($angka[$i] != "0")
        {
            if ($angka[$i + 1] != "1")
            {
                $kata3 = $kata[$angka[$i]];
            }
        }

        /* pengujian angka apakah tidak nol semua,
        lalu ditambahkan tingkat */
        if (($angka[$i] != "0") or ($angka[$i + 1] != "0") or ($angka[$i + 2] != "0"))
        {
            $subkalimat = "$kata1 $kata2 $kata3 " . $tingkat[$j] . " ";
        }

        /* gabungkan variabe sub kalimat (untuk satu blok 3 angka)
        ke variabel kalimat */
        $kalimat = $subkalimat . $kalimat;
        $i = $i + 3;
        $j = $j + 1;
    }

    /* mengganti satu ribu jadi seribu jika diperlukan */
    if (($angka[5] == "0") and ($angka[6] == "0"))
    {
        $kalimat = str_replace("satu ribu", "seribu", $kalimat);
    }

    $lok="";
    switch ($loket) {
        case 1:
            # code...
            $lok='satu';
            break;
        case 2:
            # code...
            $lok='dua';
            break;
        case 3:
            # code...
            $lok='tiga';
            break;
        case 4:
            # code...
            $lok='empat';
            break;
        case 5:
            # code...
            $lok='lima';
            break;
        case 6:
            # code...
            $lok='enam';
            break;
        case 7:
            # code...
            $lok='tujuh';
            break;
        case 8:
            # code...
            $lok='delapan';
            break;
    }

    return trim("antri ".$kalimat." loket ".$lok);
}

/**
 * Memutar kata dalam format audio 
 *
*/
function terbilangSuara($kalimat)
{
    /* pecah kalimat dalam bentuk kata */
    $boxKata	= explode(" ",$kalimat);
    $last[0]	= "stop";		
    $boxKata = array_merge($boxKata,$last);
	
    /* membuat playlist dalam format xml */
    include "ownxmlwriter.php";
    $xml = new OwnXmlWriter();

    $xml->push('xml');
    foreach ($boxKata as $key => $val)
    {
        if ($val != "")
        {
            $xml->push('track');
            $xml->element('path', 'audio/' . $val . '.mp3');
            $xml->element('title', $val);
            $xml->pop();
        }
    }
    $xml->pop();

    $fp = fopen('playlist.xml', 'w');
    fwrite($fp, $xml->getXml());
    fclose($fp);
    // print $kalimat;
}

?>
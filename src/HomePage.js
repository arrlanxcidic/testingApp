/* @flow */

import * as React from 'react';
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {
  Title,
  Paragraph,
  Card,
  Button,
  withTheme,
  BottomNavigation,
} from 'react-native-paper';
import HabitView from './components/ListHabit';
import ReminderView from './components/ListReminder';
import Profile from './components/Profile';

type State = {
  index: number,
  routes: Array<{
    key: string,
    title: string,
    icon: string,
    color: string,
  }>,
};

const habits = [
  {
    id: 1,
    duration: 100,
    start: '',
    end: '',
    reminder: [
      {
        name: 'Ayo persiapkan untuk puasa besok, hari senin.',
        date: '',
        day: 'sunday',
        time: '17:00',
        period: 'weekly',
        hariReminder: 'Minggu',
      },
      {
        name: 'Ayo persiapkan untuk puasa besok, hari kamis.',
        date: '',
        day: 'wednesday',
        time: '17:00',
        period: 'weekly',
        hariReminder: 'Rabu',
      },
    ],
    title: 'Puasa senin kamis',
    description:
      'Manusia yang rajin menjalankan ibadah ini, tanpa disadari dapat memaksimalkan tiga kecerdasan',
    active: false,
    isFinished: false,
    details:
      'Manusia yang rajin menjalankan ibadah ini, tanpa disadari dapat memaksimalkan tiga kecerdasan, antaralain yaitu kecerdasan intelektual, emosional, dan spiritual.\n\nKonsep puasa dalam Islam, secara substansial merupakan menahan diri tidak makan, minum dan berhubungan intim mulai terbit fajar sampai terbenamnya matahari. Selain itu perlu diketahui bahwa Allah berjanji akan memberikan berkah kepada manusia yang menjalakan puasa Senin Kamis. Maka dari itu janganlah ragu dalam menjalankan ibadah ini.',
  },
  {
    id: 2,
    duration: 100,
    start: '',
    end: '',
    reminder: [
      {
        name: 'Ayo persiapkan dirimu untuk olahraga',
        date: '',
        day: 'sunday',
        time: '07:00',
        period: 'weekly',
        hariReminder: 'Minggu',
      },
    ],
    title: 'Olahraga',
    description:
      'Kebiasaan olahraga nabi yaitu lari, gulat, memanah, anggar, berkuda dan berenang',
    active: false,
    isFinished: false,
    details:
      'Olahraga adalah salah satu cara untuk menjaga kesehatan tubuh kita agar tak mudah terkena penyakit. Tubuh yang bugar usai berolahraga akan membuat kita lebih produktif menjalani hari-hari kita dengan serangkaian aktivitas, tak terkecuali ibadah. Ternyata ajaran Islam pun sangat menyarankan umatnya untuk berolahraga, hal ini terbukti dari beberapa hadist mengenai aktivitas olahraga Rasulullah. Kata olahraga memang tidak secara langsung disebutkan, tapi kita dapat memahaminya dari penjelasan hadist tersebut.',
  },
  {
    id: 3,
    duration: 100,
    start: '',
    end: '',
    reminder: [
      {
        name: 'Sudah tidur ala nabi hari ini?',
        date: '',
        day: '',
        time: '20:00',
        period: 'daily',
        hariReminder: 'Setiap Hari',
      },
    ],
    title: 'Tidur Ala Nabi',
    description:
      'Ternyata pola tidur Nabi Muhammad SAW adalah cara tidur yang paling sehat dan sudah terbukti',
    active: false,
    isFinished: false,
    details: `Nabi Muhammad SAW merupakan Nabi yang patut diteladani termasuk dalam masalah tidur. Nabi yang hidup sekitar 1400 tahun silam ini ternyata memiliki cara tidur sehat yang memiliki dampak kesehatan setelah diteliti oleh ilmuan masa kini. Cara-cara tidur Nabi ternyata diakui oleh ilmuan sebagai cara-cara yang mendatangkan kesehatan bagi tubuh.
    \n\nTidur Dalam Keadaan Gelap
    \n\nTidur Dengan Menghadap Kekanan
    \n\nTidak Tidur Telungkup
    \n\nTidak Tidur Terlentang
    \n\nMeluruskan Punggung dan Sedikit Menekuk Kaki
    \n\nTidur Beralaskan Tangan
    \n\nTidur Selepas Sholat Isya dan bangun di sepertiga malam terakhir
    `,
  },
  {
    id: 4,
    duration: 100,
    start: '',
    end: '',
    reminder: [
      {
        name: 'Jangan lupa makan sehat tiap hari ya',
        date: '',
        day: '',
        time: '12:00',
        period: 'daily',
        hariReminder: 'Setiap Hari',
      },
    ],
    title: 'Makanan Sehat',
    description:
      'Islam mengatur pola hidup muslim dengan menyeluruh, termasuk soal makanan.',
    active: false,
    isFinished: false,
    details: `Dalam al qur’an surat al Baqarah ayat 172-173 yang berbunyi “Hai orang-orang yang beriman, makanlah di antara rezki yang baik-baik yang Kami berikan kepadamu dan bersyukurlah kepada Allah, jika benar-benar hanya kepada-Nya kamu menyembah. Sesungguhnya Allah hanya mengharamkan bagimu bangkai, darah, daging babi dan binatang yang (ketika disembelih) disebut (nama) selain Allah. Tetapi barangsiapa dalam keadaan terpaksa (memakannya) sedang ia tidak menginginkannya dan tidak (pula) melampaui batas, maka tidak ada dosa baginya. Sesungguhnya Allah Maha Pengampun lagi Maha Penyayang.”
    \n\nAdapun makanan yang dianjurkan antara lain:
    \n\nDaging dan ikan
    \n\nSusu
    \n\nMadu
    \n\nBuah-buahan dan sayuran
    `,
  },
];

class ButtomNavigationExample extends React.Component<{}, State> {
  static title = 'Islamic Habit';

  state = {
    index: 0,
    routes: [
      {
        key: 'accessibilitynew',
        title: 'Habit',
        icon: 'accessibility',
        color: '#c51162',
      },
      {
        key: 'announcement',
        title: 'Reminder',
        icon: 'announcement',
        color: '#c51162',
      },
      {
        key: 'profil',
        title: 'Profil',
        icon: 'face',
        color: '#c51162',
      },
    ],
  };

  componentDidMount() {
    this._storeMasterData();
  }

  _storeMasterData = async () => {
    try {
      const exist = await AsyncStorage.getItem('@masterdata');
      // if (!exist) {
      await AsyncStorage.setItem('@masterdata', JSON.stringify(habits));
      // }
    } catch (error) {
      console.log('​catch -> error ', error);
      // Error saving data
    }
  };

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={index => this.setState({ index })}
        renderScene={BottomNavigation.SceneMap({
          accessibilitynew: HabitView,
          announcement: ReminderView,
          profil: Profile,
        })}
      />
    );
  }
}

export default ButtomNavigationExample;

'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/Home.module.css";
export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Здравствуйте! Здесь Вы сможете найти ближайший зоомагазин!</h1>
      <Image 
        src="/cat.png" 
        alt="кошка" 
        width={500} 
        height={300} 
        className={styles.image} 
      />
      <div className={styles['button-container']}> 
        <Link href="/map">
          <button className={styles.button}>Посмотреть зоомагазины на карте</button>
        </Link>
        <Link href="/create">
          <button className={styles.button}>Добавить новый зоомагазин</button>
        </Link>
      </div>
    </div>
  );
}
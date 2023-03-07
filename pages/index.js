import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch('/api/getproduct?id=2')
      .then((response) => response.json())
      .then((data) => {
        setImage(ConvertToImageUrl(data.image.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const ConvertToImageUrl = (bufferData) => {
    const blob = new Blob([new Uint8Array(bufferData)], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {
          image ?
            <img src={image} width="80%" alt="" />
            :
            <span style={{ fontWeight: "bold", fontSize: "24px" }}>
              Loading...
            </span>
        }

      </main>
    </>
  )
}

import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from 'next/link';
import Ui from '../../components/ui'
import Head from 'next/head';
import ContextProvider from '../../context'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "META",
  description: "Non-custodial Runes Launchpad & Inscribing service"
};

export default function RootLayout({ children }) {
  return (
<html lang="en">
      <Head>
         <meta property="og:image" content="/assets/metaimage-main.png" />
         <meta name="twitter:image" content="/assets/metaimage-main.png" />
      </Head>
      <ContextProvider>
        <body className={inter.className}>
          <div>
            <Ui className="ui"/>
          <div className="content">{children}</div>
          </div>
          {/* <div className="main">
            <div className="square-deco-container contain">
              <div className="square-deco-content">

                <div className="content">{children}</div>

                <div className="art">
                  <div>
                    <div className="icons-social">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="logo">LOGO</div>
                    <button className="connect">CONNECT</button>
                  </div>

                  <Image
                    src="/assets/floating.webp"
                    alt="floating island"
                    className="float"
                    layout="fill"
                    objectFit="contain"
                    priority
                  />
                  <Image
                    src="/assets/spiral.webp"
                    alt="spiral"
                    className="spiral"
                    layout="fill"
                    objectFit="contain"
                  />
                  <Image
                    src="/assets/rune.webp"
                    alt="rune"
                    className="rune"
                    layout="fill"
                    objectFit="contain"
                  />

                  <div className="footer">
                    <div className="inner-footer">
                      <div><Link href="/">HOME</Link></div>
                      <div>MINT</div>
                      <div><Link href="/inscribe">INSCRIBE</Link></div>
                      <div>LAUNCHPAD</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="square-deco-inner">
                <Image
                  src="/assets/clouds/cloud1.webp"
                  alt="clouds one"
                  className="cloud1"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
                <Image
                  src="/assets/clouds/cloud2.webp"
                  alt="clouds two"
                  className="cloud2"
                  layout="fill"
                  objectFit="contain"
                />
                <Image
                  src="/assets/clouds/cloud3.webp"
                  alt="clouds tree"
                  className="cloud3"
                  layout="fill"
                  objectFit="contain"
                />
                <Image
                  src="/assets/clouds/cloud4.webp"
                  alt="clouds four"
                  className="cloud4"
                  layout="fill"
                  objectFit="contain"
                />
                <Image
                  src="/assets/clouds/cloud4.webp"
                  alt="clouds five"
                  className="cloud5"
                  layout="fill"
                  objectFit="contain"
                />
                <Image
                  src="/assets/star.webp"
                  alt="star"
                  className="star"
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <div className="square-deco-square-left-top"></div>
              <div className="square-deco-square-left-bottom"></div>
              <div className="square-deco-square-right-top"></div>
              <div className="square-deco-square-right-bottom"></div>
              <div className="square-deco-tall"></div>
              <div className="square-deco-wide"></div>
            </div>
          </div> */}
        </body>
      </ContextProvider>

    </html>
  );
}
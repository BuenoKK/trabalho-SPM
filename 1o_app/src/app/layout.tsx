
import "./globals.css";
import { Header_i } from "../component/header_i";
import { Footer_i } from "../component/footer_i";

export default function RootLayout
(
    { children }
    : LayoutProps<"/">
) 
{
  return (
    <html>
      <body>
        <Header_i/>
        
        { children }

        <Footer_i/>
      </body>
    </html>
  );
}
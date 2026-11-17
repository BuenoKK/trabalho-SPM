import "./global_i.css";
import { Header } from "../../component/header";


export default function RootLayout
(
    { children }
    : LayoutProps<"/">
) 
{
  return (
    <html>
      <body>
        <Header/>
        
        { children }

        
      </body>
    </html>
  );
}

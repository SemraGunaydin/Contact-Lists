import { useEffect, useState} from "react";
import api from "../api";
import { RiSearchLine } from "react-icons/ri";
import { IoIosMenu } from "react-icons/io";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAddSharp } from "react-icons/io5";

// Components
import Card from "./components/card";
import Modal from "./components/Modal";
import Field from "./components/Field";




function App() {

  // State kurulumu
 const [contacts, setContacts] = useState([]);
 const [isModelOpen, setIsModelOpen] = useState(false);
 const [editItem, setEditItem] = useState(null);

  // Sayfa yuklendiginde verileri al
  useEffect(() => {
    api.get("/contact").then((res) => setContacts(res.data));
  }, []);

  // form gonderildifginde calisacak fonksiyon
  const handleSubmit =(e) => {

    // sayfa yenilemesini engellemek icin 
    e.preventDefault();

    //inputta ki degere eris
    const query =e.target[1].value ;

    // Api' ye gonderilecek parametreye eris
    const params = {
      q:query,
    };

    // Api' ye istek at ve gelen state aktar
    api.get("/contact",{params}).then((res) => setContacts(res.data));

  };

  // silme ikonunu tiklayinca calistiracak fonksiyon
  const handleDelete =(id) =>{
    
    // kullanicidan onay al
    const res = confirm("kisiyi silmek istediginizden eminmisiniz?");

    // Eğerki kullanıcı onay verdiyse bu kullanıcıyı sil

    if(res) {
       // Api'a istek at ve silme işlemini başlat
       api.delete(`/contact/${id}`).then(() => {
        //Silinen kisiyi contacts state'inden de kaldirmak icin
        const updatedContacts = contacts.filter((contact) => contact.id !=id);

        // guncellenmis listeyi state aktar
        setContacts(updatedContacts);

       });
    }
  };

  // Guncelle ikonuna tiklanildiginda calisacak fonksiyon
  const handleEdit = (contact)=> {
    // modal'i ac
    setIsModelOpen(true);

    // guncelelencek kisinin verilerini state'e aktarma
    setEditItem(contact);
  }

  return (
    <div className="app">
      {/* Header */}
      <header>
        {/* Logo */}
        <h1>Contact</h1>

         <div>
          {/* Form */}
         <form onSubmit={handleSubmit}>
          <button><RiSearchLine /></button>
          <input type="search" placeholder=" Search Person ..." />
         </form>
         <button className="ns">
          <IoIosMenu />
          </button>
         <button className="ns">
          <HiMiniSquares2X2 />
          </button>
         <button  onClick= {()=> setIsModelOpen(true)} className="add">
          <IoPersonAddSharp />
         <span> New Contact</span>
         </button>

         </div>
      </header>

      {/* Main */}
      <main>
        {contacts.map((contact) => (
          <Card 
          contact = {contact} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit}
          key={contact.id} />
        ))}
      </main>

      {/* Modal */}
      <Modal 
      editItem={editItem}
      setEditItem={setEditItem}
      setContacts={setContacts} 
      isModelOpen={isModelOpen} 
      setIsModelOpen={setIsModelOpen} />

    </div>
  );
}

export default App;

//Icons
import { IoMdClose } from "react-icons/io";
import api from "../../api";

//Componenets
import Field from "./Field";


const Modal = ({isModelOpen, setIsModelOpen, setContacts, editItem, setEditItem})=> {

    // form gonderildiginde calisacak fonksiyon
  const handleSubmit = async(e) => {
    //sayfa yenilemesini engelleme
    e.preventDefault();

    // JavaScript içerisinde bulunan formData yapısı sayesinde her bir input içeirisindeki verilere teker teker erişmek yerine hepsine tek bir seferde erişebiliriz
    const formData = new FormData(e.target);

    // Object.fromEntries() metodu, bir form'daki tüm inputların key-value çiftlerini bir object'e dönüştürür
    const newContact = Object.fromEntries(formData.entries());

    if(!editItem){
        //Erisilen degerleri API'ye gonder
     const response = await api.post("/contact", newContact);

     // contacts state'ni guncelle,onceki verileri koru ve uzerine yeni kisiyi ekle
     setContacts((contacts) => [...contacts,response.data]);

    } else {
        // Guncellenecek kisiyi api'ye gonder
       const response =await api.put(`/contact/${editItem.id}`, newContact)
        // guncellenen kisiyi contacts state'i icerisinde de guncelleme
        setContacts((contacts) => 
            contacts.map((contact)=> 
                contact.id===editItem.id ? response.data :contact));
        // EditItem state geri null'a cek
        setEditItem(null);
    }

    //Model penceresini kapat
        setIsModelOpen(false);

};

    return (
        isModelOpen && (
            <div className="modal">
            <div className="modal-inner">
                {/* head */}
                <div className="modal-head">
                    {/* Edit modundaysa kisiyi guncelle degilse yeni kisi ekle degisikligi asagidaki sekilde yapilir */}
                    <h2>{editItem ? 'Update Contact' : 'Add New Contact'}</h2>
                    <button 
                    onClick={() => {
                        setEditItem(null)
                        setIsModelOpen(false)}}>
                    <IoMdClose />
                    </button>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit}>
                    <Field value={editItem?.name} label = "Name Surname" name="name"/>
                    <Field value={editItem?.position} label = "Position" name="position"/>
                    <Field value={editItem?.company} label = "Company" name="company"/>
                    <Field value={editItem?.phone} label = "Phone" name="phone"/>
                    <Field value={editItem?.email} label = "Email" name="email"/>
                    <div className="buttons">
                        <button onClick={() =>{
                        setEditItem(null)
                        setIsModelOpen(false)
                    } }
                            >
                            Skip
                        </button>
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
        ) 
    );
};

export default Modal;
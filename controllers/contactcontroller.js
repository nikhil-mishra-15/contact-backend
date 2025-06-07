const aysncHandler = require("express-async-handler");
const Contact = require("../models/contactm")


//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts =  aysncHandler(async (req,res)=>{
    const contacts = Contact.find({user_id: req.user.id});
    res.json(contacts);
});

//@desc create contacts
//@route POST /api/contacts
//@access private

const createContact = aysncHandler(async (req,res)=>{

    const {name, email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.json(contact);
});

//@desc Get A contacts
//@route GET /api/contacts/:ID
//@access private

const getContact = aysncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
    res.status(404);
    throw new Error("Contact not found");
    }

    res.json(contact);
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access private

const updateContact = aysncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
    res.status(404);
    throw new Error("Contact not found");
    }
        
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.json(updatedContact);
});

//@desc delete contacts
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = aysncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
    res.status(404);
    throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission")
    }
    await Contact.deleteOne({_id: req.params.id})
    res.json(contact);
});


module.exports = {createContact, getContact, getContacts,updateContact,deleteContact};
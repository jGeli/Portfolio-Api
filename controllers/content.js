import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Contents from "../models/Content.js";

// @desc    Update User Profile by id
// @route   POST /api/v1/users/profile/:id
// @access  Private
export const createRecord = asyncHandler(async (req, res, next) => {
        let parentId = req.params.id;
        let _id = req.params.id;
        let userId = req.userId;
    
        let content = await Contents.findById(parentId);
        let contentId = content && content.user ? userId : null;
        console.log('Ugat ugat')
        console.log(_id)
    
    

        const parent = await Contents.findById(parentId);
        let newRecord;
    
        if(!parentId){
            return  res.status(400).json({message: 'Parent Id is required!'})

        }
    
     





    if(parent){

        if(req.body._id){
            newRecord  = await Contents.findById(req.body._id);  
        } else {
            newRecord = await Contents.create({...req.body, parent: parent._id, user: userId });
        }

        parent.contents.push(newRecord);
        parent.save();
     return res.status(200).json({message: 'Created Successfully'})
    
    } else {

       await Contents.create({ ...req.body, user: userId});
        return  res.status(200).json({message: 'Created Successfully'})
    }
});

export const createRecordBulk = asyncHandler(async (req, res, next) => {
    let parentId = req.params.id;
    let userId = req.userId;
    let contents = req.body;
    const parent = await Contents.findById(parentId);

    if(!parentId){
        return  res.status(400).json({message: 'Parent Id is required!'})

    }

if(!parent){
    return  res.status(400).json({message: 'Parent not exist!'})

} 




let contentArray = [];
let existingId = [];




         contents.forEach(a => {
                    if(!a._id){
                        contentArray.push({ ...a, parent: parent._id, user: userId })
                    } else {
                        existingId.push(a._id)
                    }
                });
                
let idsContent = await Promise.all(existingId.map(async (cid) => {
    return await Contents.findById(cid); 
}))         


let newRecords = await Contents.insertMany(contentArray);
parent.contents = [...parent.contents, ...newRecords, ...idsContent];
parent.save();
return res.status(200).json({message: 'Bulk Created Successfully'})

});

export const getProfileRecords = asyncHandler(async (req, res, next) => {
    console.log(req.params.id)
    const content = await User.findOne({username: req.params.id, isDeleted: false}).populate([{
        path: 'contents',
        match: { isDeleted: false },
        populate: [
          {
            path: 'contents',
            match: { isDeleted: false },
            populate: [
                {
                  path: 'contents',
                  match: { isDeleted: false },
                  populate: [
                    {
                      path: 'contents',
                      match: { isDeleted: false }
                    }
                ]
                }
            ]
          },
        ],
      }, {
        path: 'profile'
      }])

    if(!content) {
        res.status(400)
        return next(new Error(`Content with id of ${req.params.id} doesnt exist.`))
    }

    let { contents, profile, email, username } = content;

    console.log(contents);


    let skills = contents.find(a => a.type === 'skills');
    let about = contents.find(a => a.type === 'about')
    let services = contents.find(a => a.type === 'services')
    let works = contents.find(a => a.type === 'works')
    let testimonial = contents.find(a => a.type === 'testimonial')
    let qualification = contents.find(a => a.type === 'qualification')
    let socials = contents.find(a => a.type === 'socials')
    let contact = contents.find(a => a.type === 'contact')





    res.status(200).json({
        skills,
        contact,
        about,
        services,
        works,
        testimonial,
        qualification,
        socials,
        contact,
        profile, email, username
    });
});


export const getAllProfiles = asyncHandler(async (req, res, next) => {
    console.log(req.params.id)
    // const content = await User.findOne({username: req.params.id}).populate([{
    //     path: 'contents',
    //     match: { isDeleted: false },
    //     populate: [
    //       {
    //         path: 'contents',
    //         match: { isDeleted: false }
    //       },
    //     ],
    //   }, {
    //     path: 'profile'
    //   }])

    // if(!content) {
    //     res.status(400)
    //     return next(new Error(`Content with id of ${req.params.id} doesnt exist.`))
    // }

    // let { contents, profile, email, username } = content;

    // console.log(contents);


    // let skills = contents.find(a => a.type === 'skills');
    // let about = contents.find(a => a.type === 'about')
    // let services = contents.find(a => a.type === 'services')
    // let works = contents.find(a => a.type === 'works')
    // let testimonial = contents.find(a => a.type === 'testimonial')
    // let qualification = contents.find(a => a.type === 'qualification')
    // let socials = contents.find(a => a.type === 'socials')
    // let contact = contents.find(a => a.type === 'contact')





    // res.status(200).json({
    //     skills,
    //     contact,
    //     about,
    //     services,
    //     works,
    //     testimonial,
    //     qualification,
    //     socials,
    //     contact,
    //     profile, email, username
    // });
    res.send('Success!')
});

export const getRecordById = asyncHandler(async (req, res, next) => {
    const content = await Contents.findById(req.params.id)

    if(!content) {
        res.status(400)
        return next(new Error(`Content with id of ${req.params.id} doesnt exist.`))
    }



    res.status(200).json(content);
});

export const getAllRecords = asyncHandler(async (req, res, next) => {
    const contents = await Contents.find({})

    res.status(200).json(contents)
});

export const updateRecordById = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    let userId = req.userId
    console.log(req.userId)
    let content = await Contents.findById(req.params.id);
    let contentId = content && content.user ? userId : null;
    console.log("Update ugat ugat")
    console.log(userId)
    console.log(id)
   await Contents.findOneAndUpdate({_id: id, user: contentId, isDeleted: false}, {...req.body, user: userId}, { new: true})
   .then(a => {
    console.log(a)
    return  res.json({ message: "Updated Successfully!"})
   })
   .catch(err => {
    console.log(err)
    return   res.status(400).json({message: 'Something went wrong!'})
   })

});

export const deleteRecordById = asyncHandler(async (req, res, next) => {
    let _id = req.params.id;
    let userId = req.userId;

    let content = await Contents.findById(req.params.id);
    let contentId = content && content.user ? userId : null;
    console.log('Ugat ugat')
    console.log(_id)


    let isDeleted = content && content.isDeleted ? false : true

    Contents.findOneAndUpdate({_id: _id, user: contentId}, {isDeleted: isDeleted, user: userId}, {new: true })
   .then(a => {
    console.log(a)
    return  res.json({ message: "Deleted Successfully!"})
   })
   .catch(err => {
    console.log(err)
    return   res.status(400).json({message: 'Something went wrong!', err})
   })
});

export const uploadFile = asyncHandler(async (req, res, next) => {

    try{    
        res.json({ message: "File uploaded successfully", files: req.files})
    
    } catch(err){
        console.log(err)
    }
    });


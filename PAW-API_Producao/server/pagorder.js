function paginatedData(model){
    return async(req,res,next)=>{
        const page=parseInt(req.query.page)
        const limit=parseInt(req.query.limit)
        const startIndex=(page-1)*limit
        const endIndex=page*limit
        const results={}

        if(startIndex>0){
            results.previous={
                page:page-1,
                limit:limit
            };
        }
        if(endIndex<await model.countDocuments().exec()){
            results.next={
                page:page+1,
                limit:limit
            };
        }   
        try{
            results.result=await model.find().sort({name: 1}).limit(limit).skip(startIndex).exec()
            res.paginatedData=results
            next()
        }catch(e){
            res.status(500).json({message: e.message})
        }
    }
}

function paginatedData2(model){
    return async(req,res,next)=>{
        const page=parseInt(req.query.page)
        const limit=parseInt(req.query.limit)
        const startIndex=(page-1)*limit
        const endIndex=page*limit
        const results={}

        if(startIndex>0){
            results.previous={
                page:page-1,
                limit:limit
            };
        }
        if(endIndex<await model.countDocuments().exec()){
            results.next={
                page:page+1,
                limit:limit
            };
        }   
        try{
            results.result=await model.find().sort({status: 1}).limit(2).skip(startIndex).exec()
            res.paginatedData=results
            next()
        }catch(e){
            res.status(500).json({message: e.message})
        }
    }
}

function paginatedData3(model){
    return async(req,res,next)=>{
        const page=parseInt(req.query.page)
        const limit=parseInt(req.query.limit)
        const startIndex=(page-1)*limit
        const endIndex=page*limit
        const results={}

        if(startIndex>0){
            results.previous={
                page:page-1,
                limit:limit
            };
        }
        if(endIndex<await model.countDocuments().exec()){
            results.next={
                page:page+1,
                limit:limit
            };
        }   
        try{
            results.result=await model.find().sort({batch_number: 1}).limit(limit).skip(startIndex).exec()
            res.paginatedData=results
            next()
        }catch(e){
            res.status(500).json({message: e.message})
        }
    }
}

module.exports = {
    paginatedData,
    paginatedData2,
    paginatedData3
}
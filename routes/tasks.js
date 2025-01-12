const express = require('express');
const router = express.Router();
const fs=require('fs');
const dataFilePath='./data.json';

function readData(){
    if (fs.existsSync(dataFilePath)){
        const fileData=fs.readFileSync(dataFilePath);
        return JSON.parse(fileData);
    }
    return [];
}

function writeData(data){
    fs.writeFileSync(dataFilePath,JSON.stringify(data,null,2));
}

router.get('/',(req,res)=>{
    res.json(readData());
});

//Create(POST), 할 일 추가
router.post('/',(req,res)=>{
    const data=readData()
    const newTask={id:data.length+1, ...req.body};
    data.push(newTask);
    writeData(data)
    res.status(201).json(newTask);
});

//Read(GET), 할 일 불러오기
router.get('/',(req,res)=>{
    const data=readData();
    res.json(data);
});

//Update(PUT), 할 일 수정하기
router.put('/:id',(req,res)=>{
    const data=readData()
    const taskId=parseInt(req.params.id);
    const taskIndex=data.findIndex(task=>task.id===taskId);
    if(taskIndex===-1){
        return res.status(404).json({message:'Task not found'});
    }
    data[taskIndex]={id:taskId, ...req.body};
    writeData(data)
    res.json(data[taskIndex]);
})

//Delete(DELETE),할 일 삭제하기
router.delete('/:id', (req, res) => {
    const data=readData()
    const taskId = parseInt(req.params.id);
    const taskIndex = data.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: '해당 ID를 찾을 수 없습니다.' });
    }
    data.splice(taskIndex, 1);
    writeData(data);
    res.status(200).json({ message: `ID ${taskId} 데이터가 삭제되었습니다.` });
  });

module.exports=router;
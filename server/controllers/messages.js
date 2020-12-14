import Message from "../models/Message";

export const saveMessage = async (req, res, next) => {
    const newMessage = new Message (
        {
            senderName: req.body.senderName,
            email: req.body.email,
            messageBody: req.body.messageBody,
            date: ""
        }
    )
    newMessage.save(function(err, prod){
        if(!err){
            return res.status(200).json({
                success: true,
                status: 200,
                Message: 'message sent',
                data: prod
            });
        } else{
            return res.status(500).json({
                success: false,
                status: 500,
                error: 'Server error',
                data: err
            });
        }
    });
    
}

export const getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.find();

        return res.status(200).json({
            success: true,
            status: 200,
            count: messages.length,
            data: messages
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            status: 500,
            error: 'Server error'
        });
    }
}

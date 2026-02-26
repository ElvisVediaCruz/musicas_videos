import {ValidateResult} from "./user.validator.js";

export const ValidateField = (req, res, next) =>{
    const error = ValidateResult(req);
    if(error.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};


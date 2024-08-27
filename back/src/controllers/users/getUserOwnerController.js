import getUserOwnerService from '../../services/users/getUserOwnerService.js';

const getUserOwnerController = async (req, res, next) => {
    try {
        // console.log(req.user.id);

        const ownerList = await getUserOwnerService(req.user.id);

        res.send({
            status: 'ok',
            data: {
                ownerList,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getUserOwnerController;

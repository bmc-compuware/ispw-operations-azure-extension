const input =  require('../transferObj/input');
abstract class IspwActions {
    abstract performAction(input:Input) : Promise<IspwResponse>;
}
module.exports = IspwActions;
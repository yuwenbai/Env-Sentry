let hasInit = false;
const RSentry = {

    initself: function(){
        console.log(' init self ',hasInit)
    },
    captureErrors: () => {
        hasInit = true
        console.log(' captureErrors ', hasInit)
    },
    captureMessage: () => {
        hasInit = false
        console.log(' captureMessage ', hasInit)
    }
}
export default RSentry
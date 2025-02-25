export const getColorStatus = (status)=>{

     switch(status) {
        case "Not Process" :return 'bg-gray-300'
        case "Processing" :return 'bg-blue-300'
        case "Completed" :return 'bg-green-300'
        case "Cancel" :return 'bg-red-300'


     }



}
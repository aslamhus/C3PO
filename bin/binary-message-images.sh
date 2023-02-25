#!/bin/zsh

# get imports for all c3po binary images

getImages(){
    # $1 - path to image directory
    # $2 - local path to image directory
    # $3 - the output path
    imageDir=$1
    localPathToImage=$2
    outputPath=$3
    # clean output
    echo "" > $outputPath
    count=1;
    allImages=""
    for file in $imageDir/*.png; do 
        filename=`basename $file`
        varname="img$count"
        echo -e "import $varname from '$localPathToImage/$filename'\r" >> $outputPath
        count=$((count+1))
        allImages+="$varname,"
    done


    echo -e "\n\nexport default [ $allImages]" >> $outputPath
}

main(){
    getImages "./images/binary-message" "../../../../images/binary-message" "./src/Components/Binary/BinaryMessage/images.js"
    getImages "./images/binary-star-wars" "../../../../images/binary-star-wars" "./src/Components/Binary/BinaryStarWars/images.js"
}



main

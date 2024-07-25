import React, { useEffect, useState } from 'react';

import {
    ContainerCv,
    SubContainerCv,
    UploadCv
} from '../../styles/Profil/Profil.cv.style';

import { useDropzone } from 'react-dropzone';

const ProfilCv = () => {

    const [uploadedCV, setUploadedCV] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.pdf' });
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setUploadedCV(file);
        }
    };

    return (
        <ContainerCv>
            <SubContainerCv>
                <UploadCv {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p>Déposez votre CV ici, ou cliquez pour sélectionner un fichier PDF</p>
                </UploadCv>
                {uploadedCV && (
                    <div className="uploaded-cv">
                        <p>CV téléchargé : {uploadedCV.name}</p>
                        <a href={URL.createObjectURL(uploadedCV)} target="_blank" rel="noopener noreferrer">
                            Voir le CV
                        </a>
                    </div>
                )}
            </SubContainerCv>
        </ContainerCv>
    );
}

export default ProfilCv;
import { useParams } from 'react-router-dom'
import styles from './electronic.module.css'
import { useEffect, useState } from 'react'
import { GetElectroDetail } from '../services/getElectronicD'
const Electronic = () => {
	const [elctro, setElectro] = useState(false)
	const { id } = useParams()
	useEffect(() => {
		if (id) {
			GetElectroDetail(setElectro, id)
		}
	}, [])
	console.log(elctro)
	return <div className="videoContainer">
		{id ? elctro ? <video className='video' autoPlay controls>
			<source type="video/mp4" src={elctro.href} />
		</video> : '' :
			<video className='video' autoPlay controls>
				<source type="video/mp4" src="https://firebasestorage.googleapis.com/v0/b/project-name-ae3d1.appspot.com/o/images%2FIMG_4201.MOV?alt=media&token=5a4018d1-43c5-4e61-8305-5b0f09b68bd9" />
			</video>
		}

	</div>


}
export default Electronic


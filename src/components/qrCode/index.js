import PropTypes from 'prop-types'

export default function QRCode({ size, url }) {
    const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${url}`;
    return (
        <a href={src} target='_blank'>
            <img src={src} id='qrCode' alt="QR Code" />
        </a>
    )
}

QRCode.propTypes = {
    size: PropTypes.number,
    url: PropTypes.string.isRequired,
}

QRCode.defaultProps = {
    size: 200,
}
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function Lists({ items }) {
  return (
    <ImageList
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        mr: { sm: 0, lg: 20, md: 0 },
        ml: { sm: 0, md: 0, lg: 20 },
        justifyContent: 'center',
        '& > :not(style)': {
          m: '0.3em',
          width: 300,
          height: 300,
        },
      }}
    >
      {items.map((item) => (
        <ImageListItem key={document.id}>
          <img
            sx={{ borderRadius: 2 }}
            src={`${item.imgUrl}?w=248&fit=crop&auto=format`}
            srcSet={`${item.imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.details}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.details}
            subtitle={formatDistanceToNow(item.createdAt.toDate(), {
              addSuffix: true,
            })}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

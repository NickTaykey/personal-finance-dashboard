import GeneralContext from './store/GeneralContext';
import { useContext, useRef } from 'react';

const TagsMenu = () => {
 const generalContext = useContext(GeneralContext);
 const tagNameInputRef = useRef<HTMLInputElement>(null);
 const tagColorInputRef = useRef<HTMLInputElement>(null);

 const createNewTag = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (!tagNameInputRef.current || !tagColorInputRef.current) return;
  generalContext.newTag({
   name: tagNameInputRef.current.value,
   color: tagColorInputRef.current.value,
  });
 };

 return (
  <section
   style={{ width: '20vw', padding: '1rem', border: '2px solid coral' }}
  >
   <header>
    <fieldset
     style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     }}
    >
     <label htmlFor="tag-color">Tag color</label>
     <input
      ref={tagColorInputRef}
      type="color"
      id="tag-color"
      name="tag-color"
     />
    </fieldset>
    <fieldset
     style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     }}
    >
     <label htmlFor="tag-name">Tag name</label>
     <input ref={tagNameInputRef} type="text" id="tag-name" name="tag-name" />
    </fieldset>
    <button onClick={createNewTag}>SAVE</button>
   </header>
   <footer>
    {generalContext.tags.map((t) => (
     <article style={{ display: 'flex', alignItems: 'center' }}>
      <div
       style={{
        marginRight: '1rem',
        width: '25px',
        height: '25px',
        borderRadius: '100%',
        backgroundColor: t.color,
       }}
      />
      <div>{t.name}</div>
     </article>
    ))}
   </footer>
  </section>
 );
};

export default TagsMenu;

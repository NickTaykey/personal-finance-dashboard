import GeneralContext from './store/GeneralContext';
import { useContext, useRef } from 'react';
import { isColorDark } from './helpers';

const TagsMenu = () => {
 const generalContext = useContext(GeneralContext);
 const tagNameInputRef = useRef<HTMLInputElement>(null);
 const tagColorInputRef = useRef<HTMLInputElement>(null);

 const createNewTag = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (!tagNameInputRef.current || !tagColorInputRef.current) return;
  generalContext.newTag({
   name: tagNameInputRef.current.value,
   bgColor: tagColorInputRef.current.value,
   textColor: isColorDark(tagColorInputRef.current.value) ? 'white' : 'black',
  });
 };

 return (
  <section>
   <header>
    <fieldset>
     <label htmlFor="tag-color">Tag color</label>
     <input
      ref={tagColorInputRef}
      type="color"
      id="tag-color"
      name="tag-color"
     />
    </fieldset>
    <fieldset>
     <label htmlFor="tag-name">Tag name</label>
     <input ref={tagNameInputRef} type="text" id="tag-name" name="tag-name" />
    </fieldset>
    <button onClick={createNewTag}>SAVE</button>
   </header>
   <footer>
    {generalContext.tags.map((t) => (
     <article
      style={{ display: 'flex', alignItems: 'center' }}
      key={crypto.randomUUID()}
     >
      <div
       style={{
        marginRight: '1rem',
        width: '25px',
        height: '25px',
        borderRadius: '100%',
        backgroundColor: t.bgColor,
        color: t.textColor,
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

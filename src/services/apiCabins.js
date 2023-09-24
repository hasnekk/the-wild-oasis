// DATABASE CLIENT
import supabase, { supabaseUrl } from "./supabase"

export async function getCabins() {
    let { data, error } = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.error(error);
        throw new Error("Cabins could`t be loaded");
    }

    return data;
}

export async function deleteCabin(id) {

    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.log(error);
        throw new Error(`Could not delete cabin with id: ${id}`);
    }

    return true;

}

export async function createEditCabin(cabin, id) {
    const hasImagePath = cabin.images?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${cabin.images.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ? cabin.images : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // https://pbzpirmnhrizzogjtihm.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

    // 1. create/edit
    let query = supabase.from("cabins")

    // A create if no id
    if (!id)
        query = query
            .insert([{ ...cabin, images: imagePath }])

    // B edit if id
    if (id)
        query = query.update({ ...cabin, images: imagePath })
            .eq('id', id)
            .select()


    const { data, error } = await query.select().single();


    if (error) {
        throw new Error(`Could not add cabin`);
    }

    // 2. upload image
    if (hasImagePath) return;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, cabin.images);

    // 3. prevent create if cabin image was not good
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);
        throw new Error(`Cabin image could not be uploaded and the cabin was not created`);
    }

    return data;

}
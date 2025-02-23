import {getAllArticles, getArticleById, addArticle, deleteArticle, updateArticle} from "../Models/articles_db.js";

const getAllArticlesCon = async (req, res) => {
    try {
        res.json(await getAllArticles());
    } catch (err) {
        console.log(err);
    }
}

const getArticleByIdCon = async (req, res) => {
    try {
        res.json(await getArticleById(req.params.article_id));
    } catch (err) {
        console.log(err);
    }
}

const addArticleCon = async (req, res) => {
    try {
        await addArticle(req.body);
        res.json({
            message:"Article added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteArticleCon = async (req, res) => {
    try {
        await deleteArticle(req.params.article_id);
        res.json({
            message:"Article deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updateArticleCon = async (req, res) => {
    try {
        await updateArticle(req.params.article_id, req.body);
        res.json({
            message:"Article updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllArticlesCon, getArticleByIdCon, addArticleCon, deleteArticleCon, updateArticleCon};

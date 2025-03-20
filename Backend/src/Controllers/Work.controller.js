import Work from "../Models/Work.model.js";

const insert = async (req, res) => {
  const { title, work,date, assignTo, category } = req.body;
  const data = {
    title,
    date,
    assignTo,
    category,
    work,
  };

  try {
    const response = await Work.insertOne(data);
    return res.send({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.send({
      status: false,
      error: error,
    });
  }
};

const getWorkById = async (req, res) => {
  const {id} = req.body;

  try {
    const response = await Work.find({ assignTo: id });

    return res.send({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.send({
      status: false,
      error: error,
    });
  }
};

export { insert, getWorkById };

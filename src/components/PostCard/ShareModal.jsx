import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "flowbite-react";

export default function ShareModal({ openModal, setOpenModal, shareBody, setShareBody, handleShareSubmit, post }) {
  const { user, body, image } = post;

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="lg">
      <ModalHeader className="border-b border-gray-100 pb-3">Share post</ModalHeader>
      <ModalBody className="p-4 space-y-4">
        <textarea
          rows="3"
          value={shareBody}
          onChange={(e) => setShareBody(e.target.value)}
          placeholder="Say something about this..."
          className="w-full resize-none border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
        ></textarea>

        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white p-4 space-y-3">
          <div className='flex items-center gap-3'>
            <img src={user?.photo} className='w-9 h-9 rounded-full object-cover' alt={user?.name} />
            <div>
              <h4 className='font-bold text-sm text-gray-900'>{user?.name}</h4>
              <span className='text-xs text-gray-400'>@{user?.username}</span>
            </div>
          </div>
          {body && <p className='text-sm text-gray-800'>{body}</p>}
          {image && (
            <div className="rounded-xl overflow-hidden max-h-60">
              <img src={image} className='w-full h-full object-cover' alt="Post media" />
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter className="border-t border-gray-100 pt-3 flex justify-end gap-2">
        <Button color="gray" className="rounded-xl px-4 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 border-none" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
        <Button className="rounded-xl px-4 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700" onClick={handleShareSubmit}>
          Share now
        </Button>
      </ModalFooter>
    </Modal>
  );
}